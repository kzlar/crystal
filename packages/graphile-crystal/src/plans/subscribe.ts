import type {
  CrystalResultStreamList,
  CrystalSubscriber,
  CrystalValuesList,
} from "../interfaces";
import type { StreamablePlan } from "../plan";
import { ExecutablePlan, isExecutablePlan } from "../plan";
import type { __ItemPlan } from "./__item";
import { constant } from "./constant";

export class SubscribePlan<
    TTopics extends { [topic: string]: any },
    TTopic extends keyof TTopics,
    TPayloadPlan extends ExecutablePlan,
  >
  extends ExecutablePlan<TTopics[TTopic]>
  implements StreamablePlan<TTopics[TTopic]>
{
  static $$export = {
    moduleName: "graphile-crystal",
    exportName: "SubscribePlan",
  };
  sync = true;

  /**
   * The id for the PostgreSQL context plan.
   */
  private pubsubDepId: number;

  /**
   * The plan that will tell us which topic we're subscribing to.
   */
  private topicDepId: number;

  constructor(
    pubsubOrPlan:
      | ExecutablePlan<CrystalSubscriber<TTopics>>
      | CrystalSubscriber<TTopics>,
    topicOrPlan: ExecutablePlan<TTopic> | string,
    public itemPlan: (itemPlan: __ItemPlan<TTopics[TTopic]>) => TPayloadPlan,
  ) {
    super();
    const $topic =
      typeof topicOrPlan === "string" ? constant(topicOrPlan) : topicOrPlan;
    const $pubsub = isExecutablePlan(pubsubOrPlan)
      ? pubsubOrPlan
      : constant(pubsubOrPlan);
    this.pubsubDepId = this.addDependency($pubsub);
    this.topicDepId = this.addDependency($topic);
  }

  execute(): never {
    throw new Error(
      "SubscribePlan cannot be executed, it can only be streamed",
    );
  }

  stream(
    values: [
      CrystalValuesList<CrystalSubscriber<TTopics>>,
      CrystalValuesList<TTopic>,
    ],
  ): CrystalResultStreamList<TTopics[TTopic]> {
    return values[this.pubsubDepId as 0].map((pubsub, i) => {
      const topic = values[this.topicDepId as 1][i];
      return pubsub.subscribe(topic);
    });
  }
}

export function subscribe<
  TTopics extends { [topic: string]: any },
  TTopic extends keyof TTopics,
  TPayloadPlan extends ExecutablePlan,
>(
  pubsubOrPlan:
    | ExecutablePlan<CrystalSubscriber<TTopics>>
    | CrystalSubscriber<TTopics>,
  topicOrPlan: ExecutablePlan<TTopic> | string,
  itemPlan: (itemPlan: __ItemPlan<TTopics[TTopic]>) => TPayloadPlan,
): SubscribePlan<TTopics, TTopic, TPayloadPlan> {
  return new SubscribePlan<TTopics, TTopic, TPayloadPlan>(
    pubsubOrPlan,
    topicOrPlan,
    itemPlan,
  );
}
