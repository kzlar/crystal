import type { CrystalResultsList, CrystalValuesList } from "../interfaces.js";
import { ExecutableStep } from "../step.js";

/**
 * Calls the given lambda function for each tuple
 */
export class LambdaStep<TIn, TOut> extends ExecutableStep<TOut> {
  static $$export = {
    moduleName: "grafast",
    exportName: "LambdaStep",
  };
  isSyncAndSafe = true;
  allowMultipleOptimizations = true;

  private planDep: number | null;
  constructor(
    $plan: ExecutableStep<TIn> | null | undefined,
    private fn: (value: TIn) => TOut,
  ) {
    super();
    this.planDep = $plan != null ? this.addDependency($plan) : null;
  }

  toStringMeta() {
    return (this.fn as any).displayName || this.fn.name;
  }

  deduplicate(peers: LambdaStep<any, any>[]): LambdaStep<TIn, TOut>[] {
    return peers.filter((peer) => peer.fn === this.fn);
  }

  execute(values: [CrystalValuesList<TIn>]): CrystalResultsList<TOut> {
    const { planDep } = this;
    if (planDep != null) {
      return values[planDep].map(this.fn);
    } else {
      return values[0].map(this.fn);
    }
  }
}

/**
 * A plan that takes the input `$plan` and feeds each value through the `fn`
 * callback. Note: if you need to pass more than one value, pass a `ListStep`
 * as the `$plan` argument.
 */
export function lambda<TIn, TOut>(
  $plan: ExecutableStep<TIn> | null | undefined,
  fn: (value: TIn) => TOut,
): LambdaStep<TIn, TOut> {
  return new LambdaStep<TIn, TOut>($plan, fn);
}