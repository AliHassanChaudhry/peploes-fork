import type { IBatchProcessInput, IBatchProcessResult } from "@/lib/types";

export async function batchProcess<T, R>(
  input: IBatchProcessInput<T, R>,
): Promise<IBatchProcessResult<R>> {
  const { items, processor, concurrency = 5 } = input;

  if (!Number.isInteger(concurrency) || concurrency < 1) {
    throw new RangeError("Concurrency must be a positive integer.");
  }

  const results: R[] = [];
  const errors: Array<{ index: number; error: unknown }> = [];

  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.allSettled(
      batch.map(
        async (item, batchIndex) => await processor(item, i + batchIndex),
      ),
    );

    for (let j = 0; j < batchResults.length; j++) {
      const settled = batchResults[j];
      if (settled.status === "fulfilled") {
        results.push(settled.value);
      } else {
        errors.push({ index: i + j, error: settled.reason });
      }
    }
  }

  return { results, errors };
}
