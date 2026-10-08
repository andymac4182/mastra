import { beforeEach, expect, it, vi } from 'vitest';
import { z } from 'zod/v4';
import { ToolStream } from '../../tools/stream';
import { createWorkflow } from '../create';
import { createStep } from '../workflow';

const construction = vi.hoisted(() => ({ count: 0 }));
vi.mock('../../tools/stream', async importOriginal => {
  const actual = await importOriginal<typeof import('../../tools/stream')>();
  return {
    ...actual,
    ToolStream: class extends actual.ToolStream {
      constructor(...args: ConstructorParameters<typeof actual.ToolStream>) {
        super(...args);
        construction.count++;
      }
    },
  };
});

beforeEach(() => {
  construction.count = 0;
});

it('does not construct a writer for steps that never access it', async () => {
  const step = createStep({
    id: 'unused-writer',
    inputSchema: z.number(),
    outputSchema: z.number(),
    execute: async ({ inputData }) => inputData + 1,
  });
  const workflow = createWorkflow({ id: 'unused-writer', inputSchema: z.number(), outputSchema: z.number() })
    .then(step)
    .commit();
  const run = await workflow.createRun();
  expect(await run.start({ inputData: 1 })).toMatchObject({ status: 'success', result: 2 });
  expect(construction.count).toBe(0);
});

it('constructs one real writer on first access and keeps its identity and stream methods', async () => {
  const step = createStep({
    id: 'used-writer',
    inputSchema: z.number(),
    outputSchema: z.number(),
    execute: async context => {
      expect(construction.count).toBe(0);
      const writer = context.writer;
      expect(writer).toBeInstanceOf(ToolStream);
      expect(context.writer).toBe(writer);
      await writer.write('direct');
      const streamWriter = writer.getWriter();
      await streamWriter.write('stream');
      streamWriter.releaseLock();
      await writer.custom({ type: 'custom-status' });
      return context.inputData;
    },
  });
  const workflow = createWorkflow({ id: 'used-writer', inputSchema: z.number(), outputSchema: z.number() })
    .then(step)
    .commit();
  const run = await workflow.createRun();
  expect(await run.start({ inputData: 1 })).toMatchObject({ status: 'success', result: 1 });
  expect(construction.count).toBe(1);
});

it('creates a separate writer for each retry attempt', async () => {
  const writers: ToolStream[] = [];
  const step = createStep({
    id: 'retry-writer',
    retries: 1,
    inputSchema: z.number(),
    outputSchema: z.number(),
    execute: async ({ inputData, writer }) => {
      writers.push(writer);
      if (writers.length === 1) throw new Error('retry');
      return inputData;
    },
  });
  const workflow = createWorkflow({ id: 'retry-writer', inputSchema: z.number(), outputSchema: z.number() })
    .then(step)
    .commit();
  const run = await workflow.createRun();
  expect(await run.start({ inputData: 1 })).toMatchObject({ status: 'success', result: 1 });
  expect(construction.count).toBe(2);
  expect(writers[0]).not.toBe(writers[1]);
});
