import { PgDeleteSingleStep, PgExecutor, PgResource, PgSelectStep, PgUnionAllStep, TYPES, assertPgClassSingleStep, domainOfCodec, enumCodec, listOfCodec, makeRegistry, pgDeleteSingle, pgInsertSingle, pgSelectFromRecord, pgSelectSingleFromRecord, pgUpdateSingle, rangeOfCodec, recordCodec, sqlFromArgDigests } from "@dataplan/pg";
import { ConnectionStep, EdgeStep, ObjectStep, SafeError, __ValueStep, access, assertEdgeCapableStep, assertExecutableStep, assertPageInfoCapableStep, connection, constant, context, first, getEnumValueConfig, lambda, list, makeGrafastSchema, node, object, rootValue, specFromNodeId } from "grafast";
import { valueFromASTUntyped } from "graphql";
import jsonwebtoken from "jsonwebtoken";
import { sql } from "pg-sql2";
import { inspect } from "util";
function Query_queryPlan() {
  return rootValue();
}
const handler = {
  typeName: "Query",
  codec: {
    name: "raw",
    encode(value) {
      return typeof value === "string" ? value : null;
    },
    decode(value) {
      return typeof value === "string" ? value : null;
    }
  },
  match(specifier) {
    return specifier === "query";
  },
  getSpec() {
    return "irrelevant";
  },
  get() {
    return rootValue();
  },
  plan() {
    return constant`query`;
  }
};
function base64JSONDecode(value) {
  return JSON.parse(Buffer.from(value, "base64").toString("utf8"));
}
function base64JSONEncode(value) {
  return Buffer.from(JSON.stringify(value), "utf8").toString("base64");
}
const nodeIdCodecs_base64JSON_base64JSON = {
  name: "base64JSON",
  encode: base64JSONEncode,
  decode: base64JSONDecode
};
function pipeStringDecode(value) {
  return typeof value === "string" ? value.split("|") : null;
}
function pipeStringEncode(value) {
  return Array.isArray(value) ? value.join("|") : null;
}
const nodeIdCodecs = Object.assign(Object.create(null), {
  raw: handler.codec,
  base64JSON: nodeIdCodecs_base64JSON_base64JSON,
  pipeString: {
    name: "pipeString",
    encode: pipeStringEncode,
    decode: pipeStringDecode
  }
});
const sqlIdent = sql.identifier(...["b", "guid"]);
const registryConfig_pgCodecs_guid_guid = domainOfCodec(TYPES.varchar, "guid", sqlIdent, {
  description: undefined,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "guid"
    },
    tags: Object.create(null)
  },
  notNull: false
});
const attributes_object_Object_ = Object.assign(Object.create(null), {
  x: {
    description: undefined,
    codec: TYPES.int,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  name: {
    description: undefined,
    codec: TYPES.varchar,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  description: {
    description: undefined,
    codec: TYPES.text,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  constant: {
    description: "This is constantly 2",
    codec: TYPES.int,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  }
});
const executor_mainPgExecutor = new PgExecutor({
  name: "main",
  context() {
    const ctx = context();
    return object({
      pgSettings: "pgSettings" != null ? ctx.get("pgSettings") : constant(null),
      withPgClient: ctx.get("withPgClient")
    });
  }
});
const extensions2 = {
  isTableLike: true,
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "updatable_view"
  },
  tags: Object.assign(Object.create(null), {
    uniqueKey: "x",
    unique: "x|@behavior -single -update -delete"
  })
};
const parts2 = ["b", "updatable_view"];
const sqlIdent2 = sql.identifier(...parts2);
const spec_updatableView = {
  name: "updatableView",
  identifier: sqlIdent2,
  attributes: attributes_object_Object_,
  description: "YOYOYO!!",
  extensions: extensions2,
  executor: executor_mainPgExecutor
};
const registryConfig_pgCodecs_updatableView_updatableView = recordCodec(spec_updatableView);
const extensions3 = {
  isTableLike: false,
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "jwt_token"
  },
  tags: Object.assign(Object.create(null), {
    behavior: ["-table", "jwt"]
  })
};
const parts3 = ["b", "jwt_token"];
const sqlIdent3 = sql.identifier(...parts3);
const spec_jwtToken = {
  name: "jwtToken",
  identifier: sqlIdent3,
  attributes: Object.assign(Object.create(null), {
    role: {
      description: undefined,
      codec: TYPES.text,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {}
      }
    },
    exp: {
      description: undefined,
      codec: TYPES.bigint,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {}
      }
    },
    a: {
      description: undefined,
      codec: TYPES.int,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {}
      }
    },
    b: {
      description: undefined,
      codec: TYPES.numeric,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {}
      }
    },
    c: {
      description: undefined,
      codec: TYPES.bigint,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {}
      }
    }
  }),
  description: undefined,
  extensions: extensions3,
  executor: executor_mainPgExecutor
};
const registryConfig_pgCodecs_jwtToken_jwtToken = recordCodec(spec_jwtToken);
const extensions4 = {
  pg: {
    serviceName: "main",
    schemaName: "pg_catalog",
    name: "_uuid"
  },
  tags: Object.create(null)
};
const registryConfig_pgCodecs_uuidArray_uuidArray = listOfCodec(TYPES.uuid, {
  extensions: extensions4,
  typeDelim: ",",
  description: undefined,
  name: "uuidArray"
});
const attributes2 = Object.assign(Object.create(null), {
  jwt: {
    description: undefined,
    codec: registryConfig_pgCodecs_jwtToken_jwtToken,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  id: {
    description: undefined,
    codec: TYPES.int,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  admin: {
    description: undefined,
    codec: TYPES.boolean,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  }
});
const extensions5 = {
  isTableLike: false,
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "auth_payload"
  },
  tags: Object.assign(Object.create(null), {
    foreignKey: "(id) references c.person"
  })
};
const parts4 = ["b", "auth_payload"];
const sqlIdent4 = sql.identifier(...parts4);
const spec_authPayload = {
  name: "authPayload",
  identifier: sqlIdent4,
  attributes: attributes2,
  description: undefined,
  extensions: extensions5,
  executor: executor_mainPgExecutor
};
const registryConfig_pgCodecs_authPayload_authPayload = recordCodec(spec_authPayload);
const extensions6 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "color"
  },
  tags: Object.create(null)
};
const parts5 = ["b", "color"];
const sqlIdent5 = sql.identifier(...parts5);
const attributes_c_codec_color = enumCodec({
  name: "color",
  identifier: sqlIdent5,
  values: ["red", "green", "blue"],
  description: undefined,
  extensions: extensions6
});
const enumLabels2 = ["FOO_BAR", "BAR_FOO", "BAZ_QUX", "0_BAR"];
const extensions7 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "enum_caps"
  },
  tags: Object.create(null)
};
const parts6 = ["b", "enum_caps"];
const sqlIdent6 = sql.identifier(...parts6);
const attributes_e_codec_enumCaps = enumCodec({
  name: "enumCaps",
  identifier: sqlIdent6,
  values: enumLabels2,
  description: undefined,
  extensions: extensions7
});
const enumLabels3 = ["", "one", "two"];
const extensions8 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "enum_with_empty_string"
  },
  tags: Object.create(null)
};
const parts7 = ["b", "enum_with_empty_string"];
const sqlIdent7 = sql.identifier(...parts7);
const attributes_f_codec_enumWithEmptyString = enumCodec({
  name: "enumWithEmptyString",
  identifier: sqlIdent7,
  values: enumLabels3,
  description: undefined,
  extensions: extensions8
});
const attributes3 = Object.assign(Object.create(null), {
  a: {
    description: undefined,
    codec: TYPES.int,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  b: {
    description: undefined,
    codec: TYPES.text,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  c: {
    description: undefined,
    codec: attributes_c_codec_color,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  d: {
    description: undefined,
    codec: TYPES.uuid,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  e: {
    description: undefined,
    codec: attributes_e_codec_enumCaps,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  f: {
    description: undefined,
    codec: attributes_f_codec_enumWithEmptyString,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  g: {
    description: undefined,
    codec: TYPES.interval,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  foo_bar: {
    description: undefined,
    codec: TYPES.int,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  }
});
const extensions9 = {
  isTableLike: false,
  pg: {
    serviceName: "main",
    schemaName: "c",
    name: "compound_type"
  },
  tags: Object.create(null)
};
const parts8 = ["c", "compound_type"];
const sqlIdent8 = sql.identifier(...parts8);
const spec_compoundType = {
  name: "compoundType",
  identifier: sqlIdent8,
  attributes: attributes3,
  description: "Awesome feature!",
  extensions: extensions9,
  executor: executor_mainPgExecutor
};
const registryConfig_pgCodecs_compoundType_compoundType = recordCodec(spec_compoundType);
const extensions10 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "_color"
  },
  tags: Object.create(null)
};
const attributes_enum_array_codec_colorArray = listOfCodec(attributes_c_codec_color, {
  extensions: extensions10,
  typeDelim: ",",
  description: undefined,
  name: "colorArray"
});
const extensions11 = {
  pg: {
    serviceName: "main",
    schemaName: "a",
    name: "an_int"
  },
  tags: Object.create(null)
};
const parts9 = ["a", "an_int"];
const sqlIdent9 = sql.identifier(...parts9);
const attributes_domain_codec_anInt = domainOfCodec(TYPES.int, "anInt", sqlIdent9, {
  description: undefined,
  extensions: extensions11,
  notNull: false
});
const extensions12 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "another_int"
  },
  tags: Object.create(null)
};
const parts10 = ["b", "another_int"];
const sqlIdent10 = sql.identifier(...parts10);
const attributes_domain2_codec_anotherInt = domainOfCodec(attributes_domain_codec_anInt, "anotherInt", sqlIdent10, {
  description: undefined,
  extensions: extensions12,
  notNull: false
});
const extensions13 = {
  pg: {
    serviceName: "main",
    schemaName: "pg_catalog",
    name: "_text"
  },
  tags: Object.create(null)
};
const attributes_text_array_codec_textArray = listOfCodec(TYPES.text, {
  extensions: extensions13,
  typeDelim: ",",
  description: undefined,
  name: "textArray"
});
const extensions14 = {
  pg: {
    serviceName: "main",
    schemaName: "pg_catalog",
    name: "numrange"
  },
  tags: Object.create(null)
};
const parts11 = ["pg_catalog", "numrange"];
const sqlIdent11 = sql.identifier(...parts11);
const attributes_nullable_range_codec_numrange = rangeOfCodec(TYPES.numeric, "numrange", sqlIdent11, {
  description: "range of numerics",
  extensions: extensions14
});
const extensions15 = {
  pg: {
    serviceName: "main",
    schemaName: "pg_catalog",
    name: "daterange"
  },
  tags: Object.create(null)
};
const parts12 = ["pg_catalog", "daterange"];
const sqlIdent12 = sql.identifier(...parts12);
const attributes_daterange_codec_daterange = rangeOfCodec(TYPES.date, "daterange", sqlIdent12, {
  description: "range of dates",
  extensions: extensions15
});
const extensions16 = {
  pg: {
    serviceName: "main",
    schemaName: "a",
    name: "an_int_range"
  },
  tags: Object.create(null)
};
const parts13 = ["a", "an_int_range"];
const sqlIdent13 = sql.identifier(...parts13);
const attributes_an_int_range_codec_anIntRange = rangeOfCodec(attributes_domain_codec_anInt, "anIntRange", sqlIdent13, {
  description: undefined,
  extensions: extensions16
});
const extensions17 = {
  pg: {
    serviceName: "main",
    schemaName: "pg_catalog",
    name: "_interval"
  },
  tags: Object.create(null)
};
const attributes_interval_array_codec_intervalArray = listOfCodec(TYPES.interval, {
  extensions: extensions17,
  typeDelim: ",",
  description: undefined,
  name: "intervalArray"
});
const attributes5 = Object.assign(Object.create(null), {
  a: {
    description: undefined,
    codec: registryConfig_pgCodecs_compoundType_compoundType,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  b: {
    description: undefined,
    codec: registryConfig_pgCodecs_compoundType_compoundType,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  baz_buz: {
    description: undefined,
    codec: TYPES.int,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  }
});
const extensions18 = {
  isTableLike: false,
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "nested_compound_type"
  },
  tags: Object.create(null)
};
const parts14 = ["b", "nested_compound_type"];
const sqlIdent14 = sql.identifier(...parts14);
const spec_nestedCompoundType = {
  name: "nestedCompoundType",
  identifier: sqlIdent14,
  attributes: attributes5,
  description: undefined,
  extensions: extensions18,
  executor: executor_mainPgExecutor
};
const attributes_nested_compound_type_codec_nestedCompoundType = recordCodec(spec_nestedCompoundType);
const extensions19 = {
  pg: {
    serviceName: "main",
    schemaName: "c",
    name: "text_array_domain"
  },
  tags: Object.create(null)
};
const parts15 = ["c", "text_array_domain"];
const sqlIdent15 = sql.identifier(...parts15);
const attributes_text_array_domain_codec_textArrayDomain = domainOfCodec(attributes_text_array_codec_textArray, "textArrayDomain", sqlIdent15, {
  description: undefined,
  extensions: extensions19,
  notNull: false
});
const extensions20 = {
  pg: {
    serviceName: "main",
    schemaName: "c",
    name: "int8_array_domain"
  },
  tags: Object.create(null)
};
const extensions21 = {
  pg: {
    serviceName: "main",
    schemaName: "pg_catalog",
    name: "_int8"
  },
  tags: Object.create(null)
};
const innerCodec_int8Array = listOfCodec(TYPES.bigint, {
  extensions: extensions21,
  typeDelim: ",",
  description: undefined,
  name: "int8Array"
});
const parts16 = ["c", "int8_array_domain"];
const sqlIdent16 = sql.identifier(...parts16);
const attributes_int8_array_domain_codec_int8ArrayDomain = domainOfCodec(innerCodec_int8Array, "int8ArrayDomain", sqlIdent16, {
  description: undefined,
  extensions: extensions20,
  notNull: false
});
const extensions22 = {
  pg: {
    serviceName: "main",
    schemaName: "pg_catalog",
    name: "_bytea"
  },
  tags: Object.create(null)
};
const attributes_bytea_array_codec_byteaArray = listOfCodec(TYPES.bytea, {
  extensions: extensions22,
  typeDelim: ",",
  description: undefined,
  name: "byteaArray"
});
const attributes_ltree_codec_ltree = {
  name: "ltree",
  sqlType: sql`ltree`,
  toPg(str) {
    return str;
  },
  fromPg(str) {
    return str;
  },
  executor: null,
  attributes: undefined
};
const attributes_ltree_array_codec_ltree_ = listOfCodec(attributes_ltree_codec_ltree);
const attributes4 = Object.assign(Object.create(null), {
  id: {
    description: undefined,
    codec: TYPES.int,
    notNull: true,
    hasDefault: true,
    extensions: {
      tags: {}
    }
  },
  smallint: {
    description: undefined,
    codec: TYPES.int2,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  bigint: {
    description: undefined,
    codec: TYPES.bigint,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  numeric: {
    description: undefined,
    codec: TYPES.numeric,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  decimal: {
    description: undefined,
    codec: TYPES.numeric,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  boolean: {
    description: undefined,
    codec: TYPES.boolean,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  varchar: {
    description: undefined,
    codec: TYPES.varchar,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  enum: {
    description: undefined,
    codec: attributes_c_codec_color,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  enum_array: {
    description: undefined,
    codec: attributes_enum_array_codec_colorArray,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  domain: {
    description: undefined,
    codec: attributes_domain_codec_anInt,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  domain2: {
    description: undefined,
    codec: attributes_domain2_codec_anotherInt,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  text_array: {
    description: undefined,
    codec: attributes_text_array_codec_textArray,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  json: {
    description: undefined,
    codec: TYPES.json,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  jsonb: {
    description: undefined,
    codec: TYPES.jsonb,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  nullable_range: {
    description: undefined,
    codec: attributes_nullable_range_codec_numrange,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  numrange: {
    description: undefined,
    codec: attributes_nullable_range_codec_numrange,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  daterange: {
    description: undefined,
    codec: attributes_daterange_codec_daterange,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  an_int_range: {
    description: undefined,
    codec: attributes_an_int_range_codec_anIntRange,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  timestamp: {
    description: undefined,
    codec: TYPES.timestamp,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  timestamptz: {
    description: undefined,
    codec: TYPES.timestamptz,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  date: {
    description: undefined,
    codec: TYPES.date,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  time: {
    description: undefined,
    codec: TYPES.time,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  timetz: {
    description: undefined,
    codec: TYPES.timetz,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  interval: {
    description: undefined,
    codec: TYPES.interval,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  interval_array: {
    description: undefined,
    codec: attributes_interval_array_codec_intervalArray,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  money: {
    description: undefined,
    codec: TYPES.money,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  compound_type: {
    description: undefined,
    codec: registryConfig_pgCodecs_compoundType_compoundType,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  nested_compound_type: {
    description: undefined,
    codec: attributes_nested_compound_type_codec_nestedCompoundType,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  nullable_compound_type: {
    description: undefined,
    codec: registryConfig_pgCodecs_compoundType_compoundType,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  nullable_nested_compound_type: {
    description: undefined,
    codec: attributes_nested_compound_type_codec_nestedCompoundType,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  point: {
    description: undefined,
    codec: TYPES.point,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  nullablePoint: {
    description: undefined,
    codec: TYPES.point,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  inet: {
    description: undefined,
    codec: TYPES.inet,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  cidr: {
    description: undefined,
    codec: TYPES.cidr,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  macaddr: {
    description: undefined,
    codec: TYPES.macaddr,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  regproc: {
    description: undefined,
    codec: TYPES.regproc,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  regprocedure: {
    description: undefined,
    codec: TYPES.regprocedure,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  regoper: {
    description: undefined,
    codec: TYPES.regoper,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  regoperator: {
    description: undefined,
    codec: TYPES.regoperator,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  regclass: {
    description: undefined,
    codec: TYPES.regclass,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  regtype: {
    description: undefined,
    codec: TYPES.regtype,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  regconfig: {
    description: undefined,
    codec: TYPES.regconfig,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  regdictionary: {
    description: undefined,
    codec: TYPES.regdictionary,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  text_array_domain: {
    description: undefined,
    codec: attributes_text_array_domain_codec_textArrayDomain,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  int8_array_domain: {
    description: undefined,
    codec: attributes_int8_array_domain_codec_int8ArrayDomain,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  bytea: {
    description: undefined,
    codec: TYPES.bytea,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  bytea_array: {
    description: undefined,
    codec: attributes_bytea_array_codec_byteaArray,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  ltree: {
    description: undefined,
    codec: attributes_ltree_codec_ltree,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  },
  ltree_array: {
    description: undefined,
    codec: attributes_ltree_array_codec_ltree_,
    notNull: false,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  }
});
const extensions23 = {
  isTableLike: true,
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "types"
  },
  tags: Object.assign(Object.create(null), {
    foreignKey: ["(smallint) references a.post", "(id) references a.post"]
  })
};
const parts17 = ["b", "types"];
const sqlIdent17 = sql.identifier(...parts17);
const spec_types = {
  name: "types",
  identifier: sqlIdent17,
  attributes: attributes4,
  description: undefined,
  extensions: extensions23,
  executor: executor_mainPgExecutor
};
const registryConfig_pgCodecs_types_types = recordCodec(spec_types);
const extensions24 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "_jwt_token"
  },
  tags: Object.create(null)
};
const extensions25 = {
  pg: {
    serviceName: "main",
    schemaName: "c",
    name: "_compound_type"
  },
  tags: Object.create(null)
};
const extensions26 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "_types"
  },
  tags: Object.create(null)
};
const extensions27 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "not_null_url"
  },
  tags: Object.create(null)
};
const parts18 = ["b", "not_null_url"];
const sqlIdent18 = sql.identifier(...parts18);
const registryConfig_pgCodecs_notNullUrl_notNullUrl = domainOfCodec(TYPES.varchar, "notNullUrl", sqlIdent18, {
  description: undefined,
  extensions: extensions27,
  notNull: true
});
const attributes6 = Object.assign(Object.create(null), {
  url: {
    description: undefined,
    codec: registryConfig_pgCodecs_notNullUrl_notNullUrl,
    notNull: true,
    hasDefault: false,
    extensions: {
      tags: {}
    }
  }
});
const extensions28 = {
  isTableLike: false,
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "wrapped_url"
  },
  tags: Object.create(null)
};
const parts19 = ["b", "wrapped_url"];
const sqlIdent19 = sql.identifier(...parts19);
const spec_wrappedUrl = {
  name: "wrappedUrl",
  identifier: sqlIdent19,
  attributes: attributes6,
  description: undefined,
  extensions: extensions28,
  executor: executor_mainPgExecutor
};
const extensions29 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "mult_1"
  },
  tags: {
    behavior: ["-queryField mutationField -typeField", "-filter -order"]
  }
};
const parts20 = ["b", "mult_1"];
const sqlIdent20 = sql.identifier(...parts20);
const extensions30 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "mult_2"
  },
  tags: {
    behavior: ["-queryField mutationField -typeField", "-filter -order"]
  }
};
const parts21 = ["b", "mult_2"];
const sqlIdent21 = sql.identifier(...parts21);
const fromCallback2 = (...args) => sql`${sqlIdent21}(${sqlFromArgDigests(args)})`;
const parameters2 = [{
  name: null,
  required: true,
  notNull: false,
  codec: TYPES.int
}, {
  name: null,
  required: true,
  notNull: false,
  codec: TYPES.int
}];
const extensions31 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "mult_3"
  },
  tags: {
    behavior: ["-queryField mutationField -typeField", "-filter -order"]
  }
};
const parts22 = ["b", "mult_3"];
const sqlIdent22 = sql.identifier(...parts22);
const fromCallback3 = (...args) => sql`${sqlIdent22}(${sqlFromArgDigests(args)})`;
const parameters3 = [{
  name: null,
  required: true,
  notNull: true,
  codec: TYPES.int
}, {
  name: null,
  required: true,
  notNull: true,
  codec: TYPES.int
}];
const extensions32 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "mult_4"
  },
  tags: {
    behavior: ["-queryField mutationField -typeField", "-filter -order"]
  }
};
const parts23 = ["b", "mult_4"];
const sqlIdent23 = sql.identifier(...parts23);
const fromCallback4 = (...args) => sql`${sqlIdent23}(${sqlFromArgDigests(args)})`;
const parameters4 = [{
  name: null,
  required: true,
  notNull: true,
  codec: TYPES.int
}, {
  name: null,
  required: true,
  notNull: true,
  codec: TYPES.int
}];
const extensions33 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "guid_fn"
  },
  tags: {
    behavior: ["-queryField mutationField -typeField", "-filter -order"]
  }
};
const parts24 = ["b", "guid_fn"];
const sqlIdent24 = sql.identifier(...parts24);
const fromCallback5 = (...args) => sql`${sqlIdent24}(${sqlFromArgDigests(args)})`;
const parameters5 = [{
  name: "g",
  required: true,
  notNull: false,
  codec: registryConfig_pgCodecs_guid_guid
}];
const extensions34 = {
  description: "YOYOYO!!",
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "updatable_view"
  },
  tags: {
    uniqueKey: "x",
    unique: "x|@behavior -single -update -delete"
  }
};
const parts25 = ["b", "authenticate_fail"];
const sqlIdent25 = sql.identifier(...parts25);
const options_authenticate_fail = {
  name: "authenticate_fail",
  identifier: "main.b.authenticate_fail()",
  from(...args) {
    return sql`${sqlIdent25}(${sqlFromArgDigests(args)})`;
  },
  parameters: [],
  returnsArray: false,
  returnsSetof: false,
  isMutation: true,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "authenticate_fail"
    },
    tags: {
      behavior: ["-queryField mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const extensions35 = {
  description: undefined,
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "jwt_token"
  },
  tags: {
    behavior: ["-insert", "-update", "-delete"]
  }
};
const uniques2 = [];
const resourceConfig_jwt_token = {
  executor: executor_mainPgExecutor,
  name: "jwt_token",
  identifier: "main.b.jwt_token",
  from: registryConfig_pgCodecs_jwtToken_jwtToken.sqlType,
  codec: registryConfig_pgCodecs_jwtToken_jwtToken,
  uniques: uniques2,
  isVirtual: true,
  description: undefined,
  extensions: extensions35
};
const parts26 = ["b", "authenticate"];
const sqlIdent26 = sql.identifier(...parts26);
const options_authenticate = {
  name: "authenticate",
  identifier: "main.b.authenticate(int4,numeric,int8)",
  from(...args) {
    return sql`${sqlIdent26}(${sqlFromArgDigests(args)})`;
  },
  parameters: [{
    name: "a",
    required: true,
    notNull: false,
    codec: TYPES.int
  }, {
    name: "b",
    required: true,
    notNull: false,
    codec: TYPES.numeric
  }, {
    name: "c",
    required: true,
    notNull: false,
    codec: TYPES.bigint
  }],
  returnsArray: false,
  returnsSetof: false,
  isMutation: true,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "authenticate"
    },
    tags: {
      behavior: ["-queryField mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const extensions36 = {
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "list_bde_mutation"
  },
  tags: {
    behavior: ["-queryField mutationField -typeField", "-filter -order"]
  }
};
const parts27 = ["b", "list_bde_mutation"];
const sqlIdent27 = sql.identifier(...parts27);
const fromCallback6 = (...args) => sql`${sqlIdent27}(${sqlFromArgDigests(args)})`;
const parameters6 = [{
  name: "b",
  required: true,
  notNull: false,
  codec: attributes_text_array_codec_textArray
}, {
  name: "d",
  required: true,
  notNull: false,
  codec: TYPES.text
}, {
  name: "e",
  required: true,
  notNull: false,
  codec: TYPES.text
}];
const parts28 = ["b", "authenticate_many"];
const sqlIdent28 = sql.identifier(...parts28);
const options_authenticate_many = {
  name: "authenticate_many",
  identifier: "main.b.authenticate_many(int4,numeric,int8)",
  from(...args) {
    return sql`${sqlIdent28}(${sqlFromArgDigests(args)})`;
  },
  parameters: [{
    name: "a",
    required: true,
    notNull: false,
    codec: TYPES.int
  }, {
    name: "b",
    required: true,
    notNull: false,
    codec: TYPES.numeric
  }, {
    name: "c",
    required: true,
    notNull: false,
    codec: TYPES.bigint
  }],
  returnsArray: true,
  returnsSetof: false,
  isMutation: true,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "authenticate_many"
    },
    tags: {
      behavior: ["-queryField mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const parts29 = ["b", "authenticate_payload"];
const sqlIdent29 = sql.identifier(...parts29);
const options_authenticate_payload = {
  name: "authenticate_payload",
  identifier: "main.b.authenticate_payload(int4,numeric,int8)",
  from(...args) {
    return sql`${sqlIdent29}(${sqlFromArgDigests(args)})`;
  },
  parameters: [{
    name: "a",
    required: true,
    notNull: false,
    codec: TYPES.int
  }, {
    name: "b",
    required: true,
    notNull: false,
    codec: TYPES.numeric
  }, {
    name: "c",
    required: true,
    notNull: false,
    codec: TYPES.bigint
  }],
  returnsArray: false,
  returnsSetof: false,
  isMutation: true,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "authenticate_payload"
    },
    tags: {
      behavior: ["-queryField mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const extensions37 = {
  description: undefined,
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "auth_payload"
  },
  tags: {
    foreignKey: "(id) references c.person",
    behavior: ["-insert", "-update", "-delete"]
  }
};
const uniques3 = [];
const resourceConfig_auth_payload = {
  executor: executor_mainPgExecutor,
  name: "auth_payload",
  identifier: "main.b.auth_payload",
  from: registryConfig_pgCodecs_authPayload_authPayload.sqlType,
  codec: registryConfig_pgCodecs_authPayload_authPayload,
  uniques: uniques3,
  isVirtual: true,
  description: undefined,
  extensions: extensions37
};
const parts30 = ["b", "compound_type_mutation"];
const sqlIdent30 = sql.identifier(...parts30);
const options_compound_type_mutation = {
  name: "compound_type_mutation",
  identifier: "main.b.compound_type_mutation(c.compound_type)",
  from(...args) {
    return sql`${sqlIdent30}(${sqlFromArgDigests(args)})`;
  },
  parameters: [{
    name: "object",
    required: true,
    notNull: false,
    codec: registryConfig_pgCodecs_compoundType_compoundType
  }],
  returnsArray: false,
  returnsSetof: false,
  isMutation: true,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "compound_type_mutation"
    },
    tags: {
      behavior: ["-queryField mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const resourceConfig = {
  codec: registryConfig_pgCodecs_compoundType_compoundType,
  executor: executor_mainPgExecutor
};
const parts31 = ["b", "compound_type_query"];
const sqlIdent31 = sql.identifier(...parts31);
const options_compound_type_query = {
  name: "compound_type_query",
  identifier: "main.b.compound_type_query(c.compound_type)",
  from(...args) {
    return sql`${sqlIdent31}(${sqlFromArgDigests(args)})`;
  },
  parameters: [{
    name: "object",
    required: true,
    notNull: false,
    codec: registryConfig_pgCodecs_compoundType_compoundType
  }],
  returnsArray: false,
  returnsSetof: false,
  isMutation: false,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "compound_type_query"
    },
    tags: {
      behavior: ["queryField -mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const resourceConfig2 = {
  codec: registryConfig_pgCodecs_compoundType_compoundType,
  executor: executor_mainPgExecutor
};
const parts32 = ["b", "compound_type_set_mutation"];
const sqlIdent32 = sql.identifier(...parts32);
const options_compound_type_set_mutation = {
  name: "compound_type_set_mutation",
  identifier: "main.b.compound_type_set_mutation(c.compound_type)",
  from(...args) {
    return sql`${sqlIdent32}(${sqlFromArgDigests(args)})`;
  },
  parameters: [{
    name: "object",
    required: true,
    notNull: false,
    codec: registryConfig_pgCodecs_compoundType_compoundType
  }],
  returnsArray: false,
  returnsSetof: true,
  isMutation: true,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "compound_type_set_mutation"
    },
    tags: {
      behavior: ["-queryField mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const resourceConfig3 = {
  codec: registryConfig_pgCodecs_compoundType_compoundType,
  executor: executor_mainPgExecutor
};
const parts33 = ["b", "compound_type_array_mutation"];
const sqlIdent33 = sql.identifier(...parts33);
const options_compound_type_array_mutation = {
  name: "compound_type_array_mutation",
  identifier: "main.b.compound_type_array_mutation(c.compound_type)",
  from(...args) {
    return sql`${sqlIdent33}(${sqlFromArgDigests(args)})`;
  },
  parameters: [{
    name: "object",
    required: true,
    notNull: false,
    codec: registryConfig_pgCodecs_compoundType_compoundType
  }],
  returnsArray: true,
  returnsSetof: false,
  isMutation: true,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "compound_type_array_mutation"
    },
    tags: {
      behavior: ["-queryField mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const resourceConfig4 = {
  codec: registryConfig_pgCodecs_compoundType_compoundType,
  executor: executor_mainPgExecutor
};
const parts34 = ["b", "compound_type_array_query"];
const sqlIdent34 = sql.identifier(...parts34);
const options_compound_type_array_query = {
  name: "compound_type_array_query",
  identifier: "main.b.compound_type_array_query(c.compound_type)",
  from(...args) {
    return sql`${sqlIdent34}(${sqlFromArgDigests(args)})`;
  },
  parameters: [{
    name: "object",
    required: true,
    notNull: false,
    codec: registryConfig_pgCodecs_compoundType_compoundType
  }],
  returnsArray: true,
  returnsSetof: false,
  isMutation: false,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "compound_type_array_query"
    },
    tags: {
      behavior: ["queryField -mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const resourceConfig5 = {
  codec: registryConfig_pgCodecs_compoundType_compoundType,
  executor: executor_mainPgExecutor
};
const extensions38 = {
  description: undefined,
  pg: {
    serviceName: "main",
    schemaName: "b",
    name: "types"
  },
  tags: {
    foreignKey: extensions23.tags.foreignKey
  }
};
const uniques4 = [{
  isPrimary: true,
  attributes: ["id"],
  description: undefined,
  extensions: {
    tags: Object.create(null)
  }
}];
const registryConfig_pgResources_types_types = {
  executor: executor_mainPgExecutor,
  name: "types",
  identifier: "main.b.types",
  from: registryConfig_pgCodecs_types_types.sqlType,
  codec: registryConfig_pgCodecs_types_types,
  uniques: uniques4,
  isVirtual: false,
  description: undefined,
  extensions: extensions38
};
const parts35 = ["b", "type_function_connection"];
const sqlIdent35 = sql.identifier(...parts35);
const options_type_function_connection = {
  name: "type_function_connection",
  identifier: "main.b.type_function_connection()",
  from(...args) {
    return sql`${sqlIdent35}(${sqlFromArgDigests(args)})`;
  },
  parameters: [],
  returnsArray: false,
  returnsSetof: true,
  isMutation: false,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "type_function_connection"
    },
    tags: {
      behavior: ["queryField -mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const parts36 = ["b", "type_function_connection_mutation"];
const sqlIdent36 = sql.identifier(...parts36);
const options_type_function_connection_mutation = {
  name: "type_function_connection_mutation",
  identifier: "main.b.type_function_connection_mutation()",
  from(...args) {
    return sql`${sqlIdent36}(${sqlFromArgDigests(args)})`;
  },
  parameters: [],
  returnsArray: false,
  returnsSetof: true,
  isMutation: true,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "type_function_connection_mutation"
    },
    tags: {
      behavior: ["-queryField mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const parts37 = ["b", "type_function"];
const sqlIdent37 = sql.identifier(...parts37);
const options_type_function = {
  name: "type_function",
  identifier: "main.b.type_function(int4)",
  from(...args) {
    return sql`${sqlIdent37}(${sqlFromArgDigests(args)})`;
  },
  parameters: [{
    name: "id",
    required: true,
    notNull: false,
    codec: TYPES.int
  }],
  returnsArray: false,
  returnsSetof: false,
  isMutation: false,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "type_function"
    },
    tags: {
      behavior: ["queryField -mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const parts38 = ["b", "type_function_mutation"];
const sqlIdent38 = sql.identifier(...parts38);
const options_type_function_mutation = {
  name: "type_function_mutation",
  identifier: "main.b.type_function_mutation(int4)",
  from(...args) {
    return sql`${sqlIdent38}(${sqlFromArgDigests(args)})`;
  },
  parameters: [{
    name: "id",
    required: true,
    notNull: false,
    codec: TYPES.int
  }],
  returnsArray: false,
  returnsSetof: false,
  isMutation: true,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "type_function_mutation"
    },
    tags: {
      behavior: ["-queryField mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const parts39 = ["b", "type_function_list"];
const sqlIdent39 = sql.identifier(...parts39);
const options_type_function_list = {
  name: "type_function_list",
  identifier: "main.b.type_function_list()",
  from(...args) {
    return sql`${sqlIdent39}(${sqlFromArgDigests(args)})`;
  },
  parameters: [],
  returnsArray: true,
  returnsSetof: false,
  isMutation: false,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "type_function_list"
    },
    tags: {
      behavior: ["queryField -mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const parts40 = ["b", "type_function_list_mutation"];
const sqlIdent40 = sql.identifier(...parts40);
const options_type_function_list_mutation = {
  name: "type_function_list_mutation",
  identifier: "main.b.type_function_list_mutation()",
  from(...args) {
    return sql`${sqlIdent40}(${sqlFromArgDigests(args)})`;
  },
  parameters: [],
  returnsArray: true,
  returnsSetof: false,
  isMutation: true,
  extensions: {
    pg: {
      serviceName: "main",
      schemaName: "b",
      name: "type_function_list_mutation"
    },
    tags: {
      behavior: ["-queryField mutationField -typeField", "-filter -order"]
    }
  },
  description: undefined
};
const registry = makeRegistry({
  pgCodecs: Object.assign(Object.create(null), {
    int4: TYPES.int,
    guid: registryConfig_pgCodecs_guid_guid,
    varchar: TYPES.varchar,
    updatableView: registryConfig_pgCodecs_updatableView_updatableView,
    text: TYPES.text,
    jwtToken: registryConfig_pgCodecs_jwtToken_jwtToken,
    int8: TYPES.bigint,
    numeric: TYPES.numeric,
    uuidArray: registryConfig_pgCodecs_uuidArray_uuidArray,
    uuid: TYPES.uuid,
    authPayload: registryConfig_pgCodecs_authPayload_authPayload,
    bool: TYPES.boolean,
    compoundType: registryConfig_pgCodecs_compoundType_compoundType,
    color: attributes_c_codec_color,
    enumCaps: attributes_e_codec_enumCaps,
    enumWithEmptyString: attributes_f_codec_enumWithEmptyString,
    interval: TYPES.interval,
    types: registryConfig_pgCodecs_types_types,
    int2: TYPES.int2,
    colorArray: attributes_enum_array_codec_colorArray,
    anInt: attributes_domain_codec_anInt,
    anotherInt: attributes_domain2_codec_anotherInt,
    textArray: attributes_text_array_codec_textArray,
    json: TYPES.json,
    jsonb: TYPES.jsonb,
    numrange: attributes_nullable_range_codec_numrange,
    daterange: attributes_daterange_codec_daterange,
    date: TYPES.date,
    anIntRange: attributes_an_int_range_codec_anIntRange,
    timestamp: TYPES.timestamp,
    timestamptz: TYPES.timestamptz,
    time: TYPES.time,
    timetz: TYPES.timetz,
    intervalArray: attributes_interval_array_codec_intervalArray,
    money: TYPES.money,
    nestedCompoundType: attributes_nested_compound_type_codec_nestedCompoundType,
    point: TYPES.point,
    inet: TYPES.inet,
    cidr: TYPES.cidr,
    macaddr: TYPES.macaddr,
    regproc: TYPES.regproc,
    regprocedure: TYPES.regprocedure,
    regoper: TYPES.regoper,
    regoperator: TYPES.regoperator,
    regclass: TYPES.regclass,
    regtype: TYPES.regtype,
    regconfig: TYPES.regconfig,
    regdictionary: TYPES.regdictionary,
    textArrayDomain: attributes_text_array_domain_codec_textArrayDomain,
    int8ArrayDomain: attributes_int8_array_domain_codec_int8ArrayDomain,
    bytea: TYPES.bytea,
    byteaArray: attributes_bytea_array_codec_byteaArray,
    ltree: attributes_ltree_codec_ltree,
    "ltree[]": attributes_ltree_array_codec_ltree_,
    bpchar: TYPES.bpchar,
    jwtTokenArray: listOfCodec(registryConfig_pgCodecs_jwtToken_jwtToken, {
      extensions: extensions24,
      typeDelim: ",",
      description: undefined,
      name: "jwtTokenArray"
    }),
    compoundTypeArray: listOfCodec(registryConfig_pgCodecs_compoundType_compoundType, {
      extensions: extensions25,
      typeDelim: ",",
      description: undefined,
      name: "compoundTypeArray"
    }),
    typesArray: listOfCodec(registryConfig_pgCodecs_types_types, {
      extensions: extensions26,
      typeDelim: ",",
      description: undefined,
      name: "typesArray"
    }),
    notNullUrl: registryConfig_pgCodecs_notNullUrl_notNullUrl,
    int8Array: innerCodec_int8Array,
    wrappedUrl: recordCodec(spec_wrappedUrl)
  }),
  pgResources: Object.assign(Object.create(null), {
    mult_1: {
      executor: executor_mainPgExecutor,
      name: "mult_1",
      identifier: "main.b.mult_1(int4,int4)",
      from(...args) {
        return sql`${sqlIdent20}(${sqlFromArgDigests(args)})`;
      },
      parameters: [{
        name: null,
        required: true,
        notNull: false,
        codec: TYPES.int
      }, {
        name: null,
        required: true,
        notNull: false,
        codec: TYPES.int
      }],
      isUnique: !false,
      codec: TYPES.int,
      uniques: [],
      isMutation: true,
      extensions: extensions29,
      description: undefined
    },
    mult_2: {
      executor: executor_mainPgExecutor,
      name: "mult_2",
      identifier: "main.b.mult_2(int4,int4)",
      from: fromCallback2,
      parameters: parameters2,
      isUnique: !false,
      codec: TYPES.int,
      uniques: [],
      isMutation: true,
      extensions: extensions30,
      description: undefined
    },
    mult_3: {
      executor: executor_mainPgExecutor,
      name: "mult_3",
      identifier: "main.b.mult_3(int4,int4)",
      from: fromCallback3,
      parameters: parameters3,
      isUnique: !false,
      codec: TYPES.int,
      uniques: [],
      isMutation: true,
      extensions: extensions31,
      description: undefined
    },
    mult_4: {
      executor: executor_mainPgExecutor,
      name: "mult_4",
      identifier: "main.b.mult_4(int4,int4)",
      from: fromCallback4,
      parameters: parameters4,
      isUnique: !false,
      codec: TYPES.int,
      uniques: [],
      isMutation: true,
      extensions: extensions32,
      description: undefined
    },
    guid_fn: {
      executor: executor_mainPgExecutor,
      name: "guid_fn",
      identifier: "main.b.guid_fn(b.guid)",
      from: fromCallback5,
      parameters: parameters5,
      isUnique: !false,
      codec: registryConfig_pgCodecs_guid_guid,
      uniques: [],
      isMutation: true,
      extensions: extensions33,
      description: undefined
    },
    updatable_view: {
      executor: executor_mainPgExecutor,
      name: "updatable_view",
      identifier: "main.b.updatable_view",
      from: registryConfig_pgCodecs_updatableView_updatableView.sqlType,
      codec: registryConfig_pgCodecs_updatableView_updatableView,
      uniques: [{
        isPrimary: false,
        attributes: ["x"],
        description: undefined,
        extensions: {
          tags: Object.assign(Object.create(null), {
            behavior: "-single -update -delete"
          })
        }
      }],
      isVirtual: false,
      description: "YOYOYO!!",
      extensions: extensions34
    },
    authenticate_fail: PgResource.functionResourceOptions(resourceConfig_jwt_token, options_authenticate_fail),
    authenticate: PgResource.functionResourceOptions(resourceConfig_jwt_token, options_authenticate),
    list_bde_mutation: {
      executor: executor_mainPgExecutor,
      name: "list_bde_mutation",
      identifier: "main.b.list_bde_mutation(_text,text,text)",
      from: fromCallback6,
      parameters: parameters6,
      isUnique: !false,
      codec: registryConfig_pgCodecs_uuidArray_uuidArray,
      uniques: [],
      isMutation: true,
      extensions: extensions36,
      description: undefined
    },
    authenticate_many: PgResource.functionResourceOptions(resourceConfig_jwt_token, options_authenticate_many),
    authenticate_payload: PgResource.functionResourceOptions(resourceConfig_auth_payload, options_authenticate_payload),
    compound_type_mutation: PgResource.functionResourceOptions(resourceConfig, options_compound_type_mutation),
    compound_type_query: PgResource.functionResourceOptions(resourceConfig2, options_compound_type_query),
    compound_type_set_mutation: PgResource.functionResourceOptions(resourceConfig3, options_compound_type_set_mutation),
    compound_type_array_mutation: PgResource.functionResourceOptions(resourceConfig4, options_compound_type_array_mutation),
    compound_type_array_query: PgResource.functionResourceOptions(resourceConfig5, options_compound_type_array_query),
    types: registryConfig_pgResources_types_types,
    type_function_connection: PgResource.functionResourceOptions(registryConfig_pgResources_types_types, options_type_function_connection),
    type_function_connection_mutation: PgResource.functionResourceOptions(registryConfig_pgResources_types_types, options_type_function_connection_mutation),
    type_function: PgResource.functionResourceOptions(registryConfig_pgResources_types_types, options_type_function),
    type_function_mutation: PgResource.functionResourceOptions(registryConfig_pgResources_types_types, options_type_function_mutation),
    type_function_list: PgResource.functionResourceOptions(registryConfig_pgResources_types_types, options_type_function_list),
    type_function_list_mutation: PgResource.functionResourceOptions(registryConfig_pgResources_types_types, options_type_function_list_mutation)
  }),
  pgRelations: Object.create(null)
});
const pgResource_typesPgResource = registry.pgResources["types"];
const nodeIdHandlerByTypeName = Object.assign(Object.create(null), {
  Query: handler,
  Type: {
    typeName: "Type",
    codec: nodeIdCodecs_base64JSON_base64JSON,
    deprecationReason: undefined,
    plan($record) {
      return list([constant("types", false), $record.get("id")]);
    },
    getSpec($list) {
      return {
        id: access($list, [1])
      };
    },
    get(spec) {
      return pgResource_typesPgResource.get(spec);
    },
    match(obj) {
      return obj[0] === "types";
    }
  }
});
const argDetailsSimple = [{
  graphqlArgName: "object",
  postgresArgName: "object",
  pgCodec: registryConfig_pgCodecs_compoundType_compoundType,
  required: true,
  fetcher: null
}];
const makeArgs = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 1; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_compound_type_queryPgResource = registry.pgResources["compound_type_query"];
const argDetailsSimple2 = [{
  graphqlArgName: "object",
  postgresArgName: "object",
  pgCodec: registryConfig_pgCodecs_compoundType_compoundType,
  required: true,
  fetcher: null
}];
const makeArgs2 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 1; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple2[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_compound_type_array_queryPgResource = registry.pgResources["compound_type_array_query"];
const argDetailsSimple3 = [];
const makeArgs3 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 0; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple3[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_type_function_connectionPgResource = registry.pgResources["type_function_connection"];
const getSelectPlanFromParentAndArgs = ($root, args, _info) => {
  const selectArgs = makeArgs3(args);
  return resource_type_function_connectionPgResource.execute(selectArgs);
};
function Query_typeFunctionConnectionPlan($parent, args, info) {
  const $select = getSelectPlanFromParentAndArgs($parent, args, info);
  return connection($select, $item => $item, $item => $item.getParentStep ? $item.getParentStep().cursor() : $item.cursor());
}
function Query_typeFunctionConnection_first_applyPlan(_, $connection, arg) {
  $connection.setFirst(arg.getRaw());
}
function Query_typeFunctionConnection_last_applyPlan(_, $connection, val) {
  $connection.setLast(val.getRaw());
}
function Query_typeFunctionConnection_offset_applyPlan(_, $connection, val) {
  $connection.setOffset(val.getRaw());
}
function Query_typeFunctionConnection_before_applyPlan(_, $connection, val) {
  $connection.setBefore(val.getRaw());
}
function Query_typeFunctionConnection_after_applyPlan(_, $connection, val) {
  $connection.setAfter(val.getRaw());
}
const argDetailsSimple4 = [{
  graphqlArgName: "id",
  postgresArgName: "id",
  pgCodec: TYPES.int,
  required: true,
  fetcher: null
}];
const makeArgs4 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 1; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple4[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_type_functionPgResource = registry.pgResources["type_function"];
const argDetailsSimple5 = [];
const makeArgs5 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 0; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple5[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_type_function_listPgResource = registry.pgResources["type_function_list"];
function specForHandler(handler) {
  function spec(nodeId) {
    // We only want to return the specifier if it matches
    // this handler; otherwise return null.
    try {
      const specifier = handler.codec.decode(nodeId);
      if (handler.match(specifier)) {
        return specifier;
      }
    } catch {
      // Ignore errors
    }
    return null;
  }
  spec.displayName = `specifier_${handler.typeName}_${handler.codec.name}`;
  spec.isSyncAndSafe = true; // Optimization
  return spec;
}
const fetcher = (handler => {
  const fn = $nodeId => {
    const $decoded = lambda($nodeId, specForHandler(handler));
    return handler.get(handler.getSpec($decoded));
  };
  fn.deprecationReason = handler.deprecationReason;
  return fn;
})(nodeIdHandlerByTypeName.Type);
const resource_updatable_viewPgResource = registry.pgResources["updatable_view"];
function Query_allUpdatableViews_first_applyPlan(_, $connection, arg) {
  $connection.setFirst(arg.getRaw());
}
function Query_allUpdatableViews_last_applyPlan(_, $connection, val) {
  $connection.setLast(val.getRaw());
}
function Query_allUpdatableViews_offset_applyPlan(_, $connection, val) {
  $connection.setOffset(val.getRaw());
}
function Query_allUpdatableViews_before_applyPlan(_, $connection, val) {
  $connection.setBefore(val.getRaw());
}
function Query_allUpdatableViews_after_applyPlan(_, $connection, val) {
  $connection.setAfter(val.getRaw());
}
const applyOrderToPlan = ($select, $value, TableOrderByType) => {
  const val = $value.eval();
  if (val == null) {
    return;
  }
  if (!Array.isArray(val)) {
    throw new Error("Invalid!");
  }
  val.forEach(order => {
    const config = getEnumValueConfig(TableOrderByType, order);
    const plan = config?.extensions?.grafast?.applyPlan;
    if (typeof plan !== "function") {
      console.error(`Internal server error: invalid orderBy configuration: expected function, but received ${inspect(plan)}`);
      throw new SafeError("Internal server error: invalid orderBy configuration");
    }
    plan($select);
  });
};
function Query_allTypes_first_applyPlan(_, $connection, arg) {
  $connection.setFirst(arg.getRaw());
}
function Query_allTypes_last_applyPlan(_, $connection, val) {
  $connection.setLast(val.getRaw());
}
function Query_allTypes_offset_applyPlan(_, $connection, val) {
  $connection.setOffset(val.getRaw());
}
function Query_allTypes_before_applyPlan(_, $connection, val) {
  $connection.setBefore(val.getRaw());
}
function Query_allTypes_after_applyPlan(_, $connection, val) {
  $connection.setAfter(val.getRaw());
}
const resource_frmcdc_compoundTypePgResource = registry.pgResources["frmcdc_compoundType"];
const resource_frmcdc_nestedCompoundTypePgResource = registry.pgResources["frmcdc_nestedCompoundType"];
function Interval_secondsPlan($r) {
  return access($r, ["seconds"]);
}
function Interval_minutesPlan($r) {
  return access($r, ["minutes"]);
}
function Interval_hoursPlan($r) {
  return access($r, ["hours"]);
}
function Interval_daysPlan($r) {
  return access($r, ["days"]);
}
function Interval_monthsPlan($r) {
  return access($r, ["months"]);
}
function Interval_yearsPlan($r) {
  return access($r, ["years"]);
}
function TypesConnection_nodesPlan($connection) {
  return $connection.nodes();
}
function TypesConnection_edgesPlan($connection) {
  return $connection.edges();
}
function TypesConnection_pageInfoPlan($connection) {
  // TYPES: why is this a TypeScript issue without the 'any'?
  return $connection.pageInfo();
}
function PageInfo_hasNextPagePlan($pageInfo) {
  return $pageInfo.hasNextPage();
}
function PageInfo_hasPreviousPagePlan($pageInfo) {
  return $pageInfo.hasPreviousPage();
}
function UpdatableViewsConnection_nodesPlan($connection) {
  return $connection.nodes();
}
function UpdatableViewsConnection_edgesPlan($connection) {
  return $connection.edges();
}
function UpdatableViewsConnection_pageInfoPlan($connection) {
  // TYPES: why is this a TypeScript issue without the 'any'?
  return $connection.pageInfo();
}
const argDetailsSimple6 = [{
  graphqlArgName: "arg0",
  postgresArgName: null,
  pgCodec: TYPES.int,
  required: true,
  fetcher: null
}, {
  graphqlArgName: "arg1",
  postgresArgName: null,
  pgCodec: TYPES.int,
  required: true,
  fetcher: null
}];
const makeArgs6 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 2; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple6[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 2 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_mult_1PgResource = registry.pgResources["mult_1"];
function Mutation_mult1_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple7 = [{
  graphqlArgName: "arg0",
  postgresArgName: null,
  pgCodec: TYPES.int,
  required: true,
  fetcher: null
}, {
  graphqlArgName: "arg1",
  postgresArgName: null,
  pgCodec: TYPES.int,
  required: true,
  fetcher: null
}];
const makeArgs7 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 2; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple7[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 2 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_mult_2PgResource = registry.pgResources["mult_2"];
function Mutation_mult2_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple8 = [{
  graphqlArgName: "arg0",
  postgresArgName: null,
  pgCodec: TYPES.int,
  required: true,
  fetcher: null
}, {
  graphqlArgName: "arg1",
  postgresArgName: null,
  pgCodec: TYPES.int,
  required: true,
  fetcher: null
}];
const makeArgs8 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 2; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple8[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 2 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_mult_3PgResource = registry.pgResources["mult_3"];
function Mutation_mult3_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple9 = [{
  graphqlArgName: "arg0",
  postgresArgName: null,
  pgCodec: TYPES.int,
  required: true,
  fetcher: null
}, {
  graphqlArgName: "arg1",
  postgresArgName: null,
  pgCodec: TYPES.int,
  required: true,
  fetcher: null
}];
const makeArgs9 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 2; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple9[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 2 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_mult_4PgResource = registry.pgResources["mult_4"];
function Mutation_mult4_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple10 = [{
  graphqlArgName: "g",
  postgresArgName: "g",
  pgCodec: registryConfig_pgCodecs_guid_guid,
  required: true,
  fetcher: null
}];
const makeArgs10 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 1; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple10[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_guid_fnPgResource = registry.pgResources["guid_fn"];
function Mutation_guidFn_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple11 = [];
const makeArgs11 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 0; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple11[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_authenticate_failPgResource = registry.pgResources["authenticate_fail"];
function Mutation_authenticateFail_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple12 = [{
  graphqlArgName: "a",
  postgresArgName: "a",
  pgCodec: TYPES.int,
  required: true,
  fetcher: null
}, {
  graphqlArgName: "b",
  postgresArgName: "b",
  pgCodec: TYPES.numeric,
  required: true,
  fetcher: null
}, {
  graphqlArgName: "c",
  postgresArgName: "c",
  pgCodec: TYPES.bigint,
  required: true,
  fetcher: null
}];
const makeArgs12 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 3; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple12[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_authenticatePgResource = registry.pgResources["authenticate"];
function Mutation_authenticate_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple13 = [{
  graphqlArgName: "b",
  postgresArgName: "b",
  pgCodec: attributes_text_array_codec_textArray,
  required: true,
  fetcher: null
}, {
  graphqlArgName: "d",
  postgresArgName: "d",
  pgCodec: TYPES.text,
  required: true,
  fetcher: null
}, {
  graphqlArgName: "e",
  postgresArgName: "e",
  pgCodec: TYPES.text,
  required: true,
  fetcher: null
}];
const makeArgs13 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 3; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple13[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_list_bde_mutationPgResource = registry.pgResources["list_bde_mutation"];
function Mutation_listBdeMutation_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple14 = [{
  graphqlArgName: "a",
  postgresArgName: "a",
  pgCodec: TYPES.int,
  required: true,
  fetcher: null
}, {
  graphqlArgName: "b",
  postgresArgName: "b",
  pgCodec: TYPES.numeric,
  required: true,
  fetcher: null
}, {
  graphqlArgName: "c",
  postgresArgName: "c",
  pgCodec: TYPES.bigint,
  required: true,
  fetcher: null
}];
const makeArgs14 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 3; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple14[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_authenticate_manyPgResource = registry.pgResources["authenticate_many"];
function Mutation_authenticateMany_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple15 = [{
  graphqlArgName: "a",
  postgresArgName: "a",
  pgCodec: TYPES.int,
  required: true,
  fetcher: null
}, {
  graphqlArgName: "b",
  postgresArgName: "b",
  pgCodec: TYPES.numeric,
  required: true,
  fetcher: null
}, {
  graphqlArgName: "c",
  postgresArgName: "c",
  pgCodec: TYPES.bigint,
  required: true,
  fetcher: null
}];
const makeArgs15 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 3; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple15[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_authenticate_payloadPgResource = registry.pgResources["authenticate_payload"];
function Mutation_authenticatePayload_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple16 = [{
  graphqlArgName: "object",
  postgresArgName: "object",
  pgCodec: registryConfig_pgCodecs_compoundType_compoundType,
  required: true,
  fetcher: null
}];
const makeArgs16 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 1; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple16[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_compound_type_mutationPgResource = registry.pgResources["compound_type_mutation"];
function Mutation_compoundTypeMutation_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple17 = [{
  graphqlArgName: "object",
  postgresArgName: "object",
  pgCodec: registryConfig_pgCodecs_compoundType_compoundType,
  required: true,
  fetcher: null
}];
const makeArgs17 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 1; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple17[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_compound_type_set_mutationPgResource = registry.pgResources["compound_type_set_mutation"];
function Mutation_compoundTypeSetMutation_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple18 = [{
  graphqlArgName: "object",
  postgresArgName: "object",
  pgCodec: registryConfig_pgCodecs_compoundType_compoundType,
  required: true,
  fetcher: null
}];
const makeArgs18 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 1; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple18[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_compound_type_array_mutationPgResource = registry.pgResources["compound_type_array_mutation"];
function Mutation_compoundTypeArrayMutation_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple19 = [];
const makeArgs19 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 0; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple19[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_type_function_connection_mutationPgResource = registry.pgResources["type_function_connection_mutation"];
function Mutation_typeFunctionConnectionMutation_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple20 = [{
  graphqlArgName: "id",
  postgresArgName: "id",
  pgCodec: TYPES.int,
  required: true,
  fetcher: null
}];
const makeArgs20 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 1; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple20[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_type_function_mutationPgResource = registry.pgResources["type_function_mutation"];
function Mutation_typeFunctionMutation_input_applyPlan(_, $object) {
  return $object;
}
const argDetailsSimple21 = [];
const makeArgs21 = (args, path = []) => {
  const selectArgs = [];
  let skipped = false;
  for (let i = 0; i < 0; i++) {
    const {
      graphqlArgName,
      postgresArgName,
      pgCodec,
      required,
      fetcher
    } = argDetailsSimple21[i];
    const $raw = args.getRaw([...path, graphqlArgName]);
    let step;
    if ($raw.evalIs(undefined)) {
      if (!required && i >= 0 - 1) {
        skipped = true;
        continue;
      } else {
        step = constant(null);
      }
    } else if (fetcher) {
      step = fetcher(args.get([...path, graphqlArgName])).record();
    } else {
      step = args.get([...path, graphqlArgName]);
    }
    if (skipped) {
      const name = postgresArgName;
      if (!name) {
        throw new Error("GraphileInternalError<6f9e0fbc-6c73-4811-a7cf-c2bc2b3c0946>: This should not be possible since we asserted that allArgsAreNamed");
      }
      selectArgs.push({
        step,
        pgCodec,
        name
      });
    } else {
      selectArgs.push({
        step,
        pgCodec
      });
    }
  }
  return selectArgs;
};
const resource_type_function_list_mutationPgResource = registry.pgResources["type_function_list_mutation"];
function Mutation_typeFunctionListMutation_input_applyPlan(_, $object) {
  return $object;
}
function Mutation_createUpdatableView_input_applyPlan(_, $object) {
  return $object;
}
function Mutation_createType_input_applyPlan(_, $object) {
  return $object;
}
const specFromArgs = args => {
  const $nodeId = args.get(["input", "nodeId"]);
  return specFromNodeId(nodeIdHandlerByTypeName.Type, $nodeId);
};
function Mutation_updateType_input_applyPlan(_, $object) {
  return $object;
}
function Mutation_updateTypeById_input_applyPlan(_, $object) {
  return $object;
}
const specFromArgs2 = args => {
  const $nodeId = args.get(["input", "nodeId"]);
  return specFromNodeId(nodeIdHandlerByTypeName.Type, $nodeId);
};
function Mutation_deleteType_input_applyPlan(_, $object) {
  return $object;
}
function Mutation_deleteTypeById_input_applyPlan(_, $object) {
  return $object;
}
function Mult1Payload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function Mult1Payload_queryPlan() {
  return rootValue();
}
function Mult1Input_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function Mult2Payload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function Mult2Payload_queryPlan() {
  return rootValue();
}
function Mult2Input_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function Mult3Payload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function Mult3Payload_queryPlan() {
  return rootValue();
}
function Mult3Input_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function Mult4Payload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function Mult4Payload_queryPlan() {
  return rootValue();
}
function Mult4Input_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function GuidFnPayload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function GuidFnPayload_queryPlan() {
  return rootValue();
}
function GuidFnInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function AuthenticateFailPayload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function AuthenticateFailPayload_queryPlan() {
  return rootValue();
}
function JwtTokenPlan($in) {
  const $record = $in;
  return $record.record();
}
const attributeNames = ["role", "exp", "a", "b", "c"];
function JwtTokenParseValue(value) {
  return value;
}
function AuthenticateFailInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function AuthenticatePayload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function AuthenticatePayload_queryPlan() {
  return rootValue();
}
function AuthenticateInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function ListBdeMutationPayload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function ListBdeMutationPayload_queryPlan() {
  return rootValue();
}
function ListBdeMutationInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function AuthenticateManyPayload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function AuthenticateManyPayload_queryPlan() {
  return rootValue();
}
function AuthenticateManyInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function AuthenticatePayloadPayload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function AuthenticatePayloadPayload_queryPlan() {
  return rootValue();
}
const resource_frmcdc_jwtTokenPgResource = registry.pgResources["frmcdc_jwtToken"];
function AuthenticatePayloadInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function CompoundTypeMutationPayload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function CompoundTypeMutationPayload_queryPlan() {
  return rootValue();
}
function CompoundTypeMutationInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function CompoundTypeSetMutationPayload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function CompoundTypeSetMutationPayload_queryPlan() {
  return rootValue();
}
function CompoundTypeSetMutationInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function CompoundTypeArrayMutationPayload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function CompoundTypeArrayMutationPayload_queryPlan() {
  return rootValue();
}
function CompoundTypeArrayMutationInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function TypeFunctionConnectionMutationPayload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function TypeFunctionConnectionMutationPayload_queryPlan() {
  return rootValue();
}
function TypeFunctionConnectionMutationInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function TypeFunctionMutationPayload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function TypeFunctionMutationPayload_queryPlan() {
  return rootValue();
}
function TypeFunctionMutationInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function TypeFunctionListMutationPayload_clientMutationIdPlan($object) {
  return $object.getStepForKey("clientMutationId", true) ?? constant(undefined);
}
function TypeFunctionListMutationPayload_queryPlan() {
  return rootValue();
}
function TypeFunctionListMutationInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function CreateUpdatableViewPayload_clientMutationIdPlan($mutation) {
  return $mutation.getStepForKey("clientMutationId", true) ?? constant(null);
}
function CreateUpdatableViewPayload_updatableViewPlan($object) {
  return $object.get("result");
}
function CreateUpdatableViewPayload_queryPlan() {
  return rootValue();
}
function CreateUpdatableViewInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function CreateUpdatableViewInput_updatableView_applyPlan($object) {
  const $record = $object.getStepForKey("result");
  return $record.setPlan();
}
function CreateTypePayload_clientMutationIdPlan($mutation) {
  return $mutation.getStepForKey("clientMutationId", true) ?? constant(null);
}
function CreateTypePayload_typePlan($object) {
  return $object.get("result");
}
function CreateTypePayload_queryPlan() {
  return rootValue();
}
function CreateTypeInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function CreateTypeInput_type_applyPlan($object) {
  const $record = $object.getStepForKey("result");
  return $record.setPlan();
}
function UpdateTypePayload_clientMutationIdPlan($mutation) {
  return $mutation.getStepForKey("clientMutationId", true) ?? constant(null);
}
function UpdateTypePayload_typePlan($object) {
  return $object.get("result");
}
function UpdateTypePayload_queryPlan() {
  return rootValue();
}
function UpdateTypeInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function UpdateTypeInput_typePatch_applyPlan($object) {
  const $record = $object.getStepForKey("result");
  return $record.setPlan();
}
function UpdateTypeByIdInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function UpdateTypeByIdInput_typePatch_applyPlan($object) {
  const $record = $object.getStepForKey("result");
  return $record.setPlan();
}
function DeleteTypePayload_clientMutationIdPlan($mutation) {
  return $mutation.getStepForKey("clientMutationId", true) ?? constant(null);
}
function DeleteTypePayload_typePlan($object) {
  return $object.get("result");
}
function DeleteTypePayload_queryPlan() {
  return rootValue();
}
function DeleteTypeInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
function DeleteTypeByIdInput_clientMutationId_applyPlan($input, val) {
  $input.set("clientMutationId", val.get());
}
export const typeDefs = /* GraphQL */`"""The root query type which gives access points into the data universe."""
type Query implements Node {
  """
  Exposes the root query type nested one level down. This is helpful for Relay 1
  which can only query top level fields if they are in a particular form.
  """
  query: Query!

  """
  The root query type must be a \`Node\` to work well with Relay 1 mutations. This just resolves to \`query\`.
  """
  nodeId: ID!

  """Fetches an object given its globally unique \`ID\`."""
  node(
    """The globally unique \`ID\`."""
    nodeId: ID!
  ): Node

  """Get a single \`Type\`."""
  typeById(id: Int!): Type
  compoundTypeQuery(object: CompoundTypeInput): CompoundType
  compoundTypeArrayQuery(object: CompoundTypeInput): [CompoundType]

  """Reads and enables pagination through a set of \`Type\`."""
  typeFunctionConnection(
    """Only read the first \`n\` values of the set."""
    first: Int

    """Only read the last \`n\` values of the set."""
    last: Int

    """
    Skip the first \`n\` values from our \`after\` cursor, an alternative to cursor
    based pagination. May not be used with \`last\`.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor
  ): TypesConnection
  typeFunction(id: Int): Type
  typeFunctionList: [Type]

  """Reads a single \`Type\` using its globally unique \`ID\`."""
  type(
    """The globally unique \`ID\` to be used in selecting a single \`Type\`."""
    nodeId: ID!
  ): Type

  """Reads and enables pagination through a set of \`UpdatableView\`."""
  allUpdatableViews(
    """Only read the first \`n\` values of the set."""
    first: Int

    """Only read the last \`n\` values of the set."""
    last: Int

    """
    Skip the first \`n\` values from our \`after\` cursor, an alternative to cursor
    based pagination. May not be used with \`last\`.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering \`UpdatableView\`."""
    orderBy: [UpdatableViewsOrderBy!] = [NATURAL]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: UpdatableViewCondition
  ): UpdatableViewsConnection

  """Reads and enables pagination through a set of \`Type\`."""
  allTypes(
    """Only read the first \`n\` values of the set."""
    first: Int

    """Only read the last \`n\` values of the set."""
    last: Int

    """
    Skip the first \`n\` values from our \`after\` cursor, an alternative to cursor
    based pagination. May not be used with \`last\`.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering \`Type\`."""
    orderBy: [TypesOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: TypeCondition
  ): TypesConnection
}

"""An object with a globally unique \`ID\`."""
interface Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
}

type Type implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  smallint: Int!
  bigint: BigInt!
  numeric: BigFloat!
  decimal: BigFloat!
  boolean: Boolean!
  varchar: String!
  enum: Color!
  enumArray: [Color]!
  domain: AnInt!
  domain2: AnotherInt!
  textArray: [String]!
  json: JSON!
  jsonb: JSON!
  nullableRange: BigFloatRange
  numrange: BigFloatRange!
  daterange: DateRange!
  anIntRange: AnIntRange!
  timestamp: Datetime!
  timestamptz: Datetime!
  date: Date!
  time: Time!
  timetz: Time!
  interval: Interval!
  intervalArray: [Interval]!
  money: Float!
  compoundType: CompoundType!
  nestedCompoundType: NestedCompoundType!
  nullableCompoundType: CompoundType
  nullableNestedCompoundType: NestedCompoundType
  point: Point!
  nullablePoint: Point
  inet: InternetAddress
  cidr: String
  macaddr: String
  regproc: RegProc
  regprocedure: RegProcedure
  regoper: RegOper
  regoperator: RegOperator
  regclass: RegClass
  regtype: RegType
  regconfig: RegConfig
  regdictionary: RegDictionary
  textArrayDomain: [String]
  int8ArrayDomain: [BigInt]
  bytea: Base64EncodedBinary
  byteaArray: [Base64EncodedBinary]
  ltree: LTree
  ltreeArray: [LTree]
}

"""
A signed eight-byte integer. The upper big integer values are greater than the
max value for a JavaScript number. Therefore all big integers will be output as
strings and not numbers.
"""
scalar BigInt

"""
A floating point number that requires more precision than IEEE 754 binary 64
"""
scalar BigFloat

enum Color {
  RED
  GREEN
  BLUE
}

scalar AnInt

scalar AnotherInt

"""
A JavaScript object encoded in the JSON format as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
"""
scalar JSON

"""A range of \`BigFloat\`."""
type BigFloatRange {
  """The starting bound of our range."""
  start: BigFloatRangeBound

  """The ending bound of our range."""
  end: BigFloatRangeBound
}

"""
The value at one end of a range. A range can either include this value, or not.
"""
type BigFloatRangeBound {
  """The value at one end of our range."""
  value: BigFloat!

  """Whether or not the value of this bound is included in the range."""
  inclusive: Boolean!
}

"""A range of \`Date\`."""
type DateRange {
  """The starting bound of our range."""
  start: DateRangeBound

  """The ending bound of our range."""
  end: DateRangeBound
}

"""
The value at one end of a range. A range can either include this value, or not.
"""
type DateRangeBound {
  """The value at one end of our range."""
  value: Date!

  """Whether or not the value of this bound is included in the range."""
  inclusive: Boolean!
}

"""A calendar date in YYYY-MM-DD format."""
scalar Date

"""A range of \`AnInt\`."""
type AnIntRange {
  """The starting bound of our range."""
  start: AnIntRangeBound

  """The ending bound of our range."""
  end: AnIntRangeBound
}

"""
The value at one end of a range. A range can either include this value, or not.
"""
type AnIntRangeBound {
  """The value at one end of our range."""
  value: AnInt!

  """Whether or not the value of this bound is included in the range."""
  inclusive: Boolean!
}

"""
A point in time as described by the [ISO
8601](https://en.wikipedia.org/wiki/ISO_8601) and, if it has a timezone, [RFC
3339](https://datatracker.ietf.org/doc/html/rfc3339) standards. Input values
that do not conform to both ISO 8601 and RFC 3339 may be coerced, which may lead
to unexpected results.
"""
scalar Datetime

"""
The exact time of day, does not include the date. May or may not have a timezone offset.
"""
scalar Time

"""
An interval of time that has passed where the smallest distinct unit is a second.
"""
type Interval {
  """
  A quantity of seconds. This is the only non-integer field, as all the other
  fields will dump their overflow into a smaller unit of time. Intervals don’t
  have a smaller unit than seconds.
  """
  seconds: Float

  """A quantity of minutes."""
  minutes: Int

  """A quantity of hours."""
  hours: Int

  """A quantity of days."""
  days: Int

  """A quantity of months."""
  months: Int

  """A quantity of years."""
  years: Int
}

"""Awesome feature!"""
type CompoundType {
  a: Int
  b: String
  c: Color
  d: UUID
  e: EnumCaps
  f: EnumWithEmptyString
  g: Interval
  fooBar: Int
}

"""
A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122).
"""
scalar UUID

enum EnumCaps {
  FOO_BAR
  BAR_FOO
  BAZ_QUX
  _0_BAR
}

enum EnumWithEmptyString {
  _EMPTY_
  ONE
  TWO
}

type NestedCompoundType {
  a: CompoundType
  b: CompoundType
  bazBuz: Int
}

"""A cartesian point."""
type Point {
  x: Float!
  y: Float!
}

"""An IPv4 or IPv6 host address, and optionally its subnet."""
scalar InternetAddress

"""A builtin object identifier type for a function name"""
scalar RegProc

"""A builtin object identifier type for a function with argument types"""
scalar RegProcedure

"""A builtin object identifier type for an operator"""
scalar RegOper

"""A builtin object identifier type for an operator with argument types"""
scalar RegOperator

"""A builtin object identifier type for a relation name"""
scalar RegClass

"""A builtin object identifier type for a data type name"""
scalar RegType

"""A builtin object identifier type for a text search configuration"""
scalar RegConfig

"""A builtin object identifier type for a text search dictionary"""
scalar RegDictionary

"""Binary data encoded using Base64"""
scalar Base64EncodedBinary

"""
Represents an \`ltree\` hierarchical label tree as outlined in https://www.postgresql.org/docs/current/ltree.html
"""
scalar LTree

"""An input for mutations affecting \`CompoundType\`"""
input CompoundTypeInput {
  a: Int
  b: String
  c: Color
  d: UUID
  e: EnumCaps
  f: EnumWithEmptyString
  g: IntervalInput
  fooBar: Int
}

"""
An interval of time that has passed where the smallest distinct unit is a second.
"""
input IntervalInput {
  """
  A quantity of seconds. This is the only non-integer field, as all the other
  fields will dump their overflow into a smaller unit of time. Intervals don’t
  have a smaller unit than seconds.
  """
  seconds: Float

  """A quantity of minutes."""
  minutes: Int

  """A quantity of hours."""
  hours: Int

  """A quantity of days."""
  days: Int

  """A quantity of months."""
  months: Int

  """A quantity of years."""
  years: Int
}

"""A connection to a list of \`Type\` values."""
type TypesConnection {
  """A list of \`Type\` objects."""
  nodes: [Type]!

  """
  A list of edges which contains the \`Type\` and cursor to aid in pagination.
  """
  edges: [TypesEdge]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* \`Type\` you could get from the connection."""
  totalCount: Int!
}

"""A \`Type\` edge in the connection."""
type TypesEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The \`Type\` at the end of the edge."""
  node: Type
}

"""A location in a connection that can be used for resuming pagination."""
scalar Cursor

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: Cursor

  """When paginating forwards, the cursor to continue."""
  endCursor: Cursor
}

"""A connection to a list of \`UpdatableView\` values."""
type UpdatableViewsConnection {
  """A list of \`UpdatableView\` objects."""
  nodes: [UpdatableView]!

  """
  A list of edges which contains the \`UpdatableView\` and cursor to aid in pagination.
  """
  edges: [UpdatableViewsEdge]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* \`UpdatableView\` you could get from the connection."""
  totalCount: Int!
}

"""YOYOYO!!"""
type UpdatableView {
  x: Int
  name: String
  description: String

  """This is constantly 2"""
  constant: Int
}

"""A \`UpdatableView\` edge in the connection."""
type UpdatableViewsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The \`UpdatableView\` at the end of the edge."""
  node: UpdatableView
}

"""Methods to use when ordering \`UpdatableView\`."""
enum UpdatableViewsOrderBy {
  NATURAL
  X_ASC
  X_DESC
  NAME_ASC
  NAME_DESC
  DESCRIPTION_ASC
  DESCRIPTION_DESC
  CONSTANT_ASC
  CONSTANT_DESC
}

"""
A condition to be used against \`UpdatableView\` object types. All fields are
tested for equality and combined with a logical ‘and.’
"""
input UpdatableViewCondition {
  """Checks for equality with the object’s \`x\` field."""
  x: Int

  """Checks for equality with the object’s \`name\` field."""
  name: String

  """Checks for equality with the object’s \`description\` field."""
  description: String

  """Checks for equality with the object’s \`constant\` field."""
  constant: Int
}

"""Methods to use when ordering \`Type\`."""
enum TypesOrderBy {
  NATURAL
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  ID_ASC
  ID_DESC
  SMALLINT_ASC
  SMALLINT_DESC
  BIGINT_ASC
  BIGINT_DESC
  NUMERIC_ASC
  NUMERIC_DESC
  DECIMAL_ASC
  DECIMAL_DESC
  BOOLEAN_ASC
  BOOLEAN_DESC
  VARCHAR_ASC
  VARCHAR_DESC
  ENUM_ASC
  ENUM_DESC
  DOMAIN_ASC
  DOMAIN_DESC
  DOMAIN2_ASC
  DOMAIN2_DESC
  JSON_ASC
  JSON_DESC
  JSONB_ASC
  JSONB_DESC
  TIMESTAMP_ASC
  TIMESTAMP_DESC
  TIMESTAMPTZ_ASC
  TIMESTAMPTZ_DESC
  DATE_ASC
  DATE_DESC
  TIME_ASC
  TIME_DESC
  TIMETZ_ASC
  TIMETZ_DESC
  INTERVAL_ASC
  INTERVAL_DESC
  MONEY_ASC
  MONEY_DESC
  COMPOUND_TYPE_ASC
  COMPOUND_TYPE_DESC
  NESTED_COMPOUND_TYPE_ASC
  NESTED_COMPOUND_TYPE_DESC
  NULLABLE_COMPOUND_TYPE_ASC
  NULLABLE_COMPOUND_TYPE_DESC
  NULLABLE_NESTED_COMPOUND_TYPE_ASC
  NULLABLE_NESTED_COMPOUND_TYPE_DESC
  POINT_ASC
  POINT_DESC
  NULLABLE_POINT_ASC
  NULLABLE_POINT_DESC
  INET_ASC
  INET_DESC
  CIDR_ASC
  CIDR_DESC
  MACADDR_ASC
  MACADDR_DESC
  REGPROC_ASC
  REGPROC_DESC
  REGPROCEDURE_ASC
  REGPROCEDURE_DESC
  REGOPER_ASC
  REGOPER_DESC
  REGOPERATOR_ASC
  REGOPERATOR_DESC
  REGCLASS_ASC
  REGCLASS_DESC
  REGTYPE_ASC
  REGTYPE_DESC
  REGCONFIG_ASC
  REGCONFIG_DESC
  REGDICTIONARY_ASC
  REGDICTIONARY_DESC
  LTREE_ASC
  LTREE_DESC
}

"""
A condition to be used against \`Type\` object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input TypeCondition {
  """Checks for equality with the object’s \`id\` field."""
  id: Int

  """Checks for equality with the object’s \`smallint\` field."""
  smallint: Int

  """Checks for equality with the object’s \`bigint\` field."""
  bigint: BigInt

  """Checks for equality with the object’s \`numeric\` field."""
  numeric: BigFloat

  """Checks for equality with the object’s \`decimal\` field."""
  decimal: BigFloat

  """Checks for equality with the object’s \`boolean\` field."""
  boolean: Boolean

  """Checks for equality with the object’s \`varchar\` field."""
  varchar: String

  """Checks for equality with the object’s \`enum\` field."""
  enum: Color

  """Checks for equality with the object’s \`enumArray\` field."""
  enumArray: [Color]

  """Checks for equality with the object’s \`domain\` field."""
  domain: AnInt

  """Checks for equality with the object’s \`domain2\` field."""
  domain2: AnotherInt

  """Checks for equality with the object’s \`textArray\` field."""
  textArray: [String]

  """Checks for equality with the object’s \`json\` field."""
  json: JSON

  """Checks for equality with the object’s \`jsonb\` field."""
  jsonb: JSON

  """Checks for equality with the object’s \`nullableRange\` field."""
  nullableRange: BigFloatRangeInput

  """Checks for equality with the object’s \`numrange\` field."""
  numrange: BigFloatRangeInput

  """Checks for equality with the object’s \`daterange\` field."""
  daterange: DateRangeInput

  """Checks for equality with the object’s \`anIntRange\` field."""
  anIntRange: AnIntRangeInput

  """Checks for equality with the object’s \`timestamp\` field."""
  timestamp: Datetime

  """Checks for equality with the object’s \`timestamptz\` field."""
  timestamptz: Datetime

  """Checks for equality with the object’s \`date\` field."""
  date: Date

  """Checks for equality with the object’s \`time\` field."""
  time: Time

  """Checks for equality with the object’s \`timetz\` field."""
  timetz: Time

  """Checks for equality with the object’s \`interval\` field."""
  interval: IntervalInput

  """Checks for equality with the object’s \`intervalArray\` field."""
  intervalArray: [IntervalInput]

  """Checks for equality with the object’s \`money\` field."""
  money: Float

  """Checks for equality with the object’s \`compoundType\` field."""
  compoundType: CompoundTypeInput

  """Checks for equality with the object’s \`nestedCompoundType\` field."""
  nestedCompoundType: NestedCompoundTypeInput

  """Checks for equality with the object’s \`nullableCompoundType\` field."""
  nullableCompoundType: CompoundTypeInput

  """
  Checks for equality with the object’s \`nullableNestedCompoundType\` field.
  """
  nullableNestedCompoundType: NestedCompoundTypeInput

  """Checks for equality with the object’s \`point\` field."""
  point: PointInput

  """Checks for equality with the object’s \`nullablePoint\` field."""
  nullablePoint: PointInput

  """Checks for equality with the object’s \`inet\` field."""
  inet: InternetAddress

  """Checks for equality with the object’s \`cidr\` field."""
  cidr: String

  """Checks for equality with the object’s \`macaddr\` field."""
  macaddr: String

  """Checks for equality with the object’s \`regproc\` field."""
  regproc: RegProc

  """Checks for equality with the object’s \`regprocedure\` field."""
  regprocedure: RegProcedure

  """Checks for equality with the object’s \`regoper\` field."""
  regoper: RegOper

  """Checks for equality with the object’s \`regoperator\` field."""
  regoperator: RegOperator

  """Checks for equality with the object’s \`regclass\` field."""
  regclass: RegClass

  """Checks for equality with the object’s \`regtype\` field."""
  regtype: RegType

  """Checks for equality with the object’s \`regconfig\` field."""
  regconfig: RegConfig

  """Checks for equality with the object’s \`regdictionary\` field."""
  regdictionary: RegDictionary

  """Checks for equality with the object’s \`textArrayDomain\` field."""
  textArrayDomain: [String]

  """Checks for equality with the object’s \`int8ArrayDomain\` field."""
  int8ArrayDomain: [BigInt]

  """Checks for equality with the object’s \`ltree\` field."""
  ltree: LTree

  """Checks for equality with the object’s \`ltreeArray\` field."""
  ltreeArray: [LTree]
}

"""A range of \`BigFloat\`."""
input BigFloatRangeInput {
  """The starting bound of our range."""
  start: BigFloatRangeBoundInput

  """The ending bound of our range."""
  end: BigFloatRangeBoundInput
}

"""
The value at one end of a range. A range can either include this value, or not.
"""
input BigFloatRangeBoundInput {
  """The value at one end of our range."""
  value: BigFloat!

  """Whether or not the value of this bound is included in the range."""
  inclusive: Boolean!
}

"""A range of \`Date\`."""
input DateRangeInput {
  """The starting bound of our range."""
  start: DateRangeBoundInput

  """The ending bound of our range."""
  end: DateRangeBoundInput
}

"""
The value at one end of a range. A range can either include this value, or not.
"""
input DateRangeBoundInput {
  """The value at one end of our range."""
  value: Date!

  """Whether or not the value of this bound is included in the range."""
  inclusive: Boolean!
}

"""A range of \`AnInt\`."""
input AnIntRangeInput {
  """The starting bound of our range."""
  start: AnIntRangeBoundInput

  """The ending bound of our range."""
  end: AnIntRangeBoundInput
}

"""
The value at one end of a range. A range can either include this value, or not.
"""
input AnIntRangeBoundInput {
  """The value at one end of our range."""
  value: AnInt!

  """Whether or not the value of this bound is included in the range."""
  inclusive: Boolean!
}

"""An input for mutations affecting \`NestedCompoundType\`"""
input NestedCompoundTypeInput {
  a: CompoundTypeInput
  b: CompoundTypeInput
  bazBuz: Int
}

"""A cartesian point."""
input PointInput {
  x: Float!
  y: Float!
}

"""
The root mutation type which contains root level fields which mutate data.
"""
type Mutation {
  mult1(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: Mult1Input!
  ): Mult1Payload
  mult2(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: Mult2Input!
  ): Mult2Payload
  mult3(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: Mult3Input!
  ): Mult3Payload
  mult4(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: Mult4Input!
  ): Mult4Payload
  guidFn(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: GuidFnInput!
  ): GuidFnPayload
  authenticateFail(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: AuthenticateFailInput!
  ): AuthenticateFailPayload
  authenticate(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: AuthenticateInput!
  ): AuthenticatePayload
  listBdeMutation(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: ListBdeMutationInput!
  ): ListBdeMutationPayload
  authenticateMany(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: AuthenticateManyInput!
  ): AuthenticateManyPayload
  authenticatePayload(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: AuthenticatePayloadInput!
  ): AuthenticatePayloadPayload
  compoundTypeMutation(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CompoundTypeMutationInput!
  ): CompoundTypeMutationPayload
  compoundTypeSetMutation(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CompoundTypeSetMutationInput!
  ): CompoundTypeSetMutationPayload
  compoundTypeArrayMutation(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CompoundTypeArrayMutationInput!
  ): CompoundTypeArrayMutationPayload
  typeFunctionConnectionMutation(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: TypeFunctionConnectionMutationInput!
  ): TypeFunctionConnectionMutationPayload
  typeFunctionMutation(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: TypeFunctionMutationInput!
  ): TypeFunctionMutationPayload
  typeFunctionListMutation(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: TypeFunctionListMutationInput!
  ): TypeFunctionListMutationPayload

  """Creates a single \`UpdatableView\`."""
  createUpdatableView(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateUpdatableViewInput!
  ): CreateUpdatableViewPayload

  """Creates a single \`Type\`."""
  createType(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateTypeInput!
  ): CreateTypePayload

  """Updates a single \`Type\` using its globally unique id and a patch."""
  updateType(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateTypeInput!
  ): UpdateTypePayload

  """Updates a single \`Type\` using a unique key and a patch."""
  updateTypeById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateTypeByIdInput!
  ): UpdateTypePayload

  """Deletes a single \`Type\` using its globally unique id."""
  deleteType(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteTypeInput!
  ): DeleteTypePayload

  """Deletes a single \`Type\` using a unique key."""
  deleteTypeById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteTypeByIdInput!
  ): DeleteTypePayload
}

"""The output of our \`mult1\` mutation."""
type Mult1Payload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  integer: Int

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the \`mult1\` mutation."""
input Mult1Input {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  arg0: Int
  arg1: Int
}

"""The output of our \`mult2\` mutation."""
type Mult2Payload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  integer: Int

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the \`mult2\` mutation."""
input Mult2Input {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  arg0: Int
  arg1: Int
}

"""The output of our \`mult3\` mutation."""
type Mult3Payload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  integer: Int

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the \`mult3\` mutation."""
input Mult3Input {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  arg0: Int!
  arg1: Int!
}

"""The output of our \`mult4\` mutation."""
type Mult4Payload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  integer: Int

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the \`mult4\` mutation."""
input Mult4Input {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  arg0: Int!
  arg1: Int!
}

"""The output of our \`guidFn\` mutation."""
type GuidFnPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  guid: Guid

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

scalar Guid

"""All input for the \`guidFn\` mutation."""
input GuidFnInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  g: Guid
}

"""The output of our \`authenticateFail\` mutation."""
type AuthenticateFailPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  jwtToken: JwtToken

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""
A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
which securely represents claims between two parties.
"""
scalar JwtToken

"""All input for the \`authenticateFail\` mutation."""
input AuthenticateFailInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
}

"""The output of our \`authenticate\` mutation."""
type AuthenticatePayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  jwtToken: JwtToken

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the \`authenticate\` mutation."""
input AuthenticateInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  a: Int
  b: BigFloat
  c: BigInt
}

"""The output of our \`listBdeMutation\` mutation."""
type ListBdeMutationPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  uuids: [UUID]

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the \`listBdeMutation\` mutation."""
input ListBdeMutationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  b: [String]
  d: String
  e: String
}

"""The output of our \`authenticateMany\` mutation."""
type AuthenticateManyPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  jwtTokens: [JwtToken]

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the \`authenticateMany\` mutation."""
input AuthenticateManyInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  a: Int
  b: BigFloat
  c: BigInt
}

"""The output of our \`authenticatePayload\` mutation."""
type AuthenticatePayloadPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  authPayload: AuthPayload

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

type AuthPayload {
  jwt: JwtToken
  id: Int
  admin: Boolean
}

"""All input for the \`authenticatePayload\` mutation."""
input AuthenticatePayloadInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  a: Int
  b: BigFloat
  c: BigInt
}

"""The output of our \`compoundTypeMutation\` mutation."""
type CompoundTypeMutationPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  compoundType: CompoundType

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the \`compoundTypeMutation\` mutation."""
input CompoundTypeMutationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  object: CompoundTypeInput
}

"""The output of our \`compoundTypeSetMutation\` mutation."""
type CompoundTypeSetMutationPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  compoundTypes: [CompoundType]

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the \`compoundTypeSetMutation\` mutation."""
input CompoundTypeSetMutationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  object: CompoundTypeInput
}

"""The output of our \`compoundTypeArrayMutation\` mutation."""
type CompoundTypeArrayMutationPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  compoundTypes: [CompoundType]

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the \`compoundTypeArrayMutation\` mutation."""
input CompoundTypeArrayMutationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  object: CompoundTypeInput
}

"""The output of our \`typeFunctionConnectionMutation\` mutation."""
type TypeFunctionConnectionMutationPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  types: [Type]

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the \`typeFunctionConnectionMutation\` mutation."""
input TypeFunctionConnectionMutationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
}

"""The output of our \`typeFunctionMutation\` mutation."""
type TypeFunctionMutationPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  type: Type

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Type\`. May be used by Relay 1."""
  typeEdge(
    """The method to use when ordering \`Type\`."""
    orderBy: [TypesOrderBy!]! = [PRIMARY_KEY_ASC]
  ): TypesEdge
}

"""All input for the \`typeFunctionMutation\` mutation."""
input TypeFunctionMutationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int
}

"""The output of our \`typeFunctionListMutation\` mutation."""
type TypeFunctionListMutationPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  types: [Type]

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the \`typeFunctionListMutation\` mutation."""
input TypeFunctionListMutationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
}

"""The output of our create \`UpdatableView\` mutation."""
type CreateUpdatableViewPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`UpdatableView\` that was created by this mutation."""
  updatableView: UpdatableView

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create \`UpdatableView\` mutation."""
input CreateUpdatableViewInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The \`UpdatableView\` to be created by this mutation."""
  updatableView: UpdatableViewInput!
}

"""An input for mutations affecting \`UpdatableView\`"""
input UpdatableViewInput {
  x: Int
  name: String
  description: String

  """This is constantly 2"""
  constant: Int
}

"""The output of our create \`Type\` mutation."""
type CreateTypePayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Type\` that was created by this mutation."""
  type: Type

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Type\`. May be used by Relay 1."""
  typeEdge(
    """The method to use when ordering \`Type\`."""
    orderBy: [TypesOrderBy!]! = [PRIMARY_KEY_ASC]
  ): TypesEdge
}

"""All input for the create \`Type\` mutation."""
input CreateTypeInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The \`Type\` to be created by this mutation."""
  type: TypeInput!
}

"""An input for mutations affecting \`Type\`"""
input TypeInput {
  id: Int
  smallint: Int!
  bigint: BigInt!
  numeric: BigFloat!
  decimal: BigFloat!
  boolean: Boolean!
  varchar: String!
  enum: Color!
  enumArray: [Color]!
  domain: AnInt!
  domain2: AnotherInt!
  textArray: [String]!
  json: JSON!
  jsonb: JSON!
  nullableRange: BigFloatRangeInput
  numrange: BigFloatRangeInput!
  daterange: DateRangeInput!
  anIntRange: AnIntRangeInput!
  timestamp: Datetime!
  timestamptz: Datetime!
  date: Date!
  time: Time!
  timetz: Time!
  interval: IntervalInput!
  intervalArray: [IntervalInput]!
  money: Float!
  compoundType: CompoundTypeInput!
  nestedCompoundType: NestedCompoundTypeInput!
  nullableCompoundType: CompoundTypeInput
  nullableNestedCompoundType: NestedCompoundTypeInput
  point: PointInput!
  nullablePoint: PointInput
  inet: InternetAddress
  cidr: String
  macaddr: String
  regproc: RegProc
  regprocedure: RegProcedure
  regoper: RegOper
  regoperator: RegOperator
  regclass: RegClass
  regtype: RegType
  regconfig: RegConfig
  regdictionary: RegDictionary
  textArrayDomain: [String]
  int8ArrayDomain: [BigInt]
  bytea: Base64EncodedBinary
  byteaArray: [Base64EncodedBinary]
  ltree: LTree
  ltreeArray: [LTree]
}

"""The output of our update \`Type\` mutation."""
type UpdateTypePayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Type\` that was updated by this mutation."""
  type: Type

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Type\`. May be used by Relay 1."""
  typeEdge(
    """The method to use when ordering \`Type\`."""
    orderBy: [TypesOrderBy!]! = [PRIMARY_KEY_ASC]
  ): TypesEdge
}

"""All input for the \`updateType\` mutation."""
input UpdateTypeInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique \`ID\` which will identify a single \`Type\` to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the \`Type\` being updated.
  """
  typePatch: TypePatch!
}

"""Represents an update to a \`Type\`. Fields that are set will be updated."""
input TypePatch {
  id: Int
  smallint: Int
  bigint: BigInt
  numeric: BigFloat
  decimal: BigFloat
  boolean: Boolean
  varchar: String
  enum: Color
  enumArray: [Color]
  domain: AnInt
  domain2: AnotherInt
  textArray: [String]
  json: JSON
  jsonb: JSON
  nullableRange: BigFloatRangeInput
  numrange: BigFloatRangeInput
  daterange: DateRangeInput
  anIntRange: AnIntRangeInput
  timestamp: Datetime
  timestamptz: Datetime
  date: Date
  time: Time
  timetz: Time
  interval: IntervalInput
  intervalArray: [IntervalInput]
  money: Float
  compoundType: CompoundTypeInput
  nestedCompoundType: NestedCompoundTypeInput
  nullableCompoundType: CompoundTypeInput
  nullableNestedCompoundType: NestedCompoundTypeInput
  point: PointInput
  nullablePoint: PointInput
  inet: InternetAddress
  cidr: String
  macaddr: String
  regproc: RegProc
  regprocedure: RegProcedure
  regoper: RegOper
  regoperator: RegOperator
  regclass: RegClass
  regtype: RegType
  regconfig: RegConfig
  regdictionary: RegDictionary
  textArrayDomain: [String]
  int8ArrayDomain: [BigInt]
  bytea: Base64EncodedBinary
  byteaArray: [Base64EncodedBinary]
  ltree: LTree
  ltreeArray: [LTree]
}

"""All input for the \`updateTypeById\` mutation."""
input UpdateTypeByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the \`Type\` being updated.
  """
  typePatch: TypePatch!
}

"""The output of our delete \`Type\` mutation."""
type DeleteTypePayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Type\` that was deleted by this mutation."""
  type: Type
  deletedTypeId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Type\`. May be used by Relay 1."""
  typeEdge(
    """The method to use when ordering \`Type\`."""
    orderBy: [TypesOrderBy!]! = [PRIMARY_KEY_ASC]
  ): TypesEdge
}

"""All input for the \`deleteType\` mutation."""
input DeleteTypeInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique \`ID\` which will identify a single \`Type\` to be deleted.
  """
  nodeId: ID!
}

"""All input for the \`deleteTypeById\` mutation."""
input DeleteTypeByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}`;
export const plans = {
  Query: {
    __assertStep() {
      return true;
    },
    query: Query_queryPlan,
    nodeId($parent) {
      const specifier = handler.plan($parent);
      return lambda(specifier, nodeIdCodecs[handler.codec.name].encode);
    },
    node: {
      plan(_$root, args) {
        return node(nodeIdHandlerByTypeName, args.get("nodeId"));
      },
      args: {
        nodeId: undefined
      }
    },
    typeById: {
      plan(_$root, args) {
        return pgResource_typesPgResource.get({
          id: args.get("id")
        });
      },
      args: {
        id: undefined
      }
    },
    compoundTypeQuery: {
      plan($root, args, _info) {
        const selectArgs = makeArgs(args);
        return resource_compound_type_queryPgResource.execute(selectArgs);
      },
      args: {
        object: undefined
      }
    },
    compoundTypeArrayQuery: {
      plan($root, args, _info) {
        const selectArgs = makeArgs2(args);
        return resource_compound_type_array_queryPgResource.execute(selectArgs);
      },
      args: {
        object: undefined
      }
    },
    typeFunctionConnection: {
      plan: Query_typeFunctionConnectionPlan,
      args: {
        first: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_typeFunctionConnection_first_applyPlan
        },
        last: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_typeFunctionConnection_last_applyPlan
        },
        offset: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_typeFunctionConnection_offset_applyPlan
        },
        before: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_typeFunctionConnection_before_applyPlan
        },
        after: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_typeFunctionConnection_after_applyPlan
        }
      }
    },
    typeFunction: {
      plan($root, args, _info) {
        const selectArgs = makeArgs4(args);
        return resource_type_functionPgResource.execute(selectArgs);
      },
      args: {
        id: undefined
      }
    },
    typeFunctionList($root, args, _info) {
      const selectArgs = makeArgs5(args);
      return resource_type_function_listPgResource.execute(selectArgs);
    },
    type: {
      plan(_$parent, args) {
        const $nodeId = args.get("nodeId");
        return fetcher($nodeId);
      },
      args: {
        nodeId: undefined
      }
    },
    allUpdatableViews: {
      plan() {
        return connection(resource_updatable_viewPgResource.find());
      },
      args: {
        first: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_allUpdatableViews_first_applyPlan
        },
        last: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_allUpdatableViews_last_applyPlan
        },
        offset: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_allUpdatableViews_offset_applyPlan
        },
        before: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_allUpdatableViews_before_applyPlan
        },
        after: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_allUpdatableViews_after_applyPlan
        },
        orderBy: {
          autoApplyAfterParentPlan: true,
          applyPlan(_, $connection, val, info) {
            const $value = val.getRaw();
            const $select = $connection.getSubplan();
            applyOrderToPlan($select, $value, info.schema.getType("UpdatableViewsOrderBy"));
            return null;
          }
        },
        condition: {
          autoApplyAfterParentPlan: true,
          applyPlan(_condition, $connection) {
            const $select = $connection.getSubplan();
            return $select.wherePlan();
          }
        }
      }
    },
    allTypes: {
      plan() {
        return connection(pgResource_typesPgResource.find());
      },
      args: {
        first: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_allTypes_first_applyPlan
        },
        last: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_allTypes_last_applyPlan
        },
        offset: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_allTypes_offset_applyPlan
        },
        before: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_allTypes_before_applyPlan
        },
        after: {
          autoApplyAfterParentPlan: true,
          applyPlan: Query_allTypes_after_applyPlan
        },
        orderBy: {
          autoApplyAfterParentPlan: true,
          applyPlan(_, $connection, val, info) {
            const $value = val.getRaw();
            const $select = $connection.getSubplan();
            applyOrderToPlan($select, $value, info.schema.getType("TypesOrderBy"));
            return null;
          }
        },
        condition: {
          autoApplyAfterParentPlan: true,
          applyPlan(_condition, $connection) {
            const $select = $connection.getSubplan();
            return $select.wherePlan();
          }
        }
      }
    }
  },
  Type: {
    __assertStep: assertPgClassSingleStep,
    nodeId($parent) {
      const specifier = nodeIdHandlerByTypeName.Type.plan($parent);
      return lambda(specifier, nodeIdCodecs[nodeIdHandlerByTypeName.Type.codec.name].encode);
    },
    id($record) {
      return $record.get("id");
    },
    smallint($record) {
      return $record.get("smallint");
    },
    bigint($record) {
      return $record.get("bigint");
    },
    numeric($record) {
      return $record.get("numeric");
    },
    decimal($record) {
      return $record.get("decimal");
    },
    boolean($record) {
      return $record.get("boolean");
    },
    varchar($record) {
      return $record.get("varchar");
    },
    enum($record) {
      return $record.get("enum");
    },
    enumArray($record) {
      return $record.get("enum_array");
    },
    domain($record) {
      return $record.get("domain");
    },
    domain2($record) {
      return $record.get("domain2");
    },
    textArray($record) {
      return $record.get("text_array");
    },
    json($record) {
      return $record.get("json");
    },
    jsonb($record) {
      return $record.get("jsonb");
    },
    nullableRange($record) {
      return $record.get("nullable_range");
    },
    numrange($record) {
      return $record.get("numrange");
    },
    daterange($record) {
      return $record.get("daterange");
    },
    anIntRange($record) {
      return $record.get("an_int_range");
    },
    timestamp($record) {
      return $record.get("timestamp");
    },
    timestamptz($record) {
      return $record.get("timestamptz");
    },
    date($record) {
      return $record.get("date");
    },
    time($record) {
      return $record.get("time");
    },
    timetz($record) {
      return $record.get("timetz");
    },
    interval($record) {
      return $record.get("interval");
    },
    intervalArray($record) {
      return $record.get("interval_array");
    },
    money($record) {
      return $record.get("money");
    },
    compoundType($record) {
      const $plan = $record.get("compound_type");
      const $select = pgSelectSingleFromRecord(resource_frmcdc_compoundTypePgResource, $plan);
      if (true) {
        $select.coalesceToEmptyObject();
      }
      $select.getClassStep().setTrusted();
      return $select;
    },
    nestedCompoundType($record) {
      const $plan = $record.get("nested_compound_type");
      const $select = pgSelectSingleFromRecord(resource_frmcdc_nestedCompoundTypePgResource, $plan);
      if (true) {
        $select.coalesceToEmptyObject();
      }
      $select.getClassStep().setTrusted();
      return $select;
    },
    nullableCompoundType($record) {
      const $plan = $record.get("nullable_compound_type");
      const $select = pgSelectSingleFromRecord(resource_frmcdc_compoundTypePgResource, $plan);
      if (undefined) {
        $select.coalesceToEmptyObject();
      }
      $select.getClassStep().setTrusted();
      return $select;
    },
    nullableNestedCompoundType($record) {
      const $plan = $record.get("nullable_nested_compound_type");
      const $select = pgSelectSingleFromRecord(resource_frmcdc_nestedCompoundTypePgResource, $plan);
      if (undefined) {
        $select.coalesceToEmptyObject();
      }
      $select.getClassStep().setTrusted();
      return $select;
    },
    point($record) {
      return $record.get("point");
    },
    nullablePoint($record) {
      return $record.get("nullablePoint");
    },
    inet($record) {
      return $record.get("inet");
    },
    cidr($record) {
      return $record.get("cidr");
    },
    macaddr($record) {
      return $record.get("macaddr");
    },
    regproc($record) {
      return $record.get("regproc");
    },
    regprocedure($record) {
      return $record.get("regprocedure");
    },
    regoper($record) {
      return $record.get("regoper");
    },
    regoperator($record) {
      return $record.get("regoperator");
    },
    regclass($record) {
      return $record.get("regclass");
    },
    regtype($record) {
      return $record.get("regtype");
    },
    regconfig($record) {
      return $record.get("regconfig");
    },
    regdictionary($record) {
      return $record.get("regdictionary");
    },
    textArrayDomain($record) {
      return $record.get("text_array_domain");
    },
    int8ArrayDomain($record) {
      return $record.get("int8_array_domain");
    },
    bytea($record) {
      return $record.get("bytea");
    },
    byteaArray($record) {
      return $record.get("bytea_array");
    },
    ltree($record) {
      return $record.get("ltree");
    },
    ltreeArray($record) {
      return $record.get("ltree_array");
    }
  },
  Color: {
    RED: {
      value: "red"
    },
    GREEN: {
      value: "green"
    },
    BLUE: {
      value: "blue"
    }
  },
  BigFloatRange: {},
  BigFloatRangeBound: {},
  DateRange: {},
  DateRangeBound: {},
  AnIntRange: {},
  AnIntRangeBound: {},
  Interval: {
    __assertStep: assertExecutableStep,
    seconds: Interval_secondsPlan,
    minutes: Interval_minutesPlan,
    hours: Interval_hoursPlan,
    days: Interval_daysPlan,
    months: Interval_monthsPlan,
    years: Interval_yearsPlan
  },
  CompoundType: {
    __assertStep: assertPgClassSingleStep,
    a($record) {
      return $record.get("a");
    },
    b($record) {
      return $record.get("b");
    },
    c($record) {
      return $record.get("c");
    },
    d($record) {
      return $record.get("d");
    },
    e($record) {
      return $record.get("e");
    },
    f($record) {
      return $record.get("f");
    },
    g($record) {
      return $record.get("g");
    },
    fooBar($record) {
      return $record.get("foo_bar");
    }
  },
  EnumCaps: {
    _0_BAR: {
      value: "0_BAR"
    }
  },
  EnumWithEmptyString: {
    _EMPTY_: {
      value: ""
    },
    ONE: {
      value: "one"
    },
    TWO: {
      value: "two"
    }
  },
  NestedCompoundType: {
    __assertStep: assertPgClassSingleStep,
    a($record) {
      const $plan = $record.get("a");
      const $select = pgSelectSingleFromRecord(resource_frmcdc_compoundTypePgResource, $plan);
      if (undefined) {
        $select.coalesceToEmptyObject();
      }
      $select.getClassStep().setTrusted();
      return $select;
    },
    b($record) {
      const $plan = $record.get("b");
      const $select = pgSelectSingleFromRecord(resource_frmcdc_compoundTypePgResource, $plan);
      if (undefined) {
        $select.coalesceToEmptyObject();
      }
      $select.getClassStep().setTrusted();
      return $select;
    },
    bazBuz($record) {
      return $record.get("baz_buz");
    }
  },
  Point: {},
  CompoundTypeInput: {
    a: {
      applyPlan($insert, val) {
        $insert.set("a", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    b: {
      applyPlan($insert, val) {
        $insert.set("b", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    c: {
      applyPlan($insert, val) {
        $insert.set("c", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    d: {
      applyPlan($insert, val) {
        $insert.set("d", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    e: {
      applyPlan($insert, val) {
        $insert.set("e", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    f: {
      applyPlan($insert, val) {
        $insert.set("f", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    g: {
      applyPlan($insert, val) {
        $insert.set("g", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    fooBar: {
      applyPlan($insert, val) {
        $insert.set("foo_bar", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    }
  },
  IntervalInput: {
    seconds: undefined,
    minutes: undefined,
    hours: undefined,
    days: undefined,
    months: undefined,
    years: undefined
  },
  TypesConnection: {
    __assertStep: ConnectionStep,
    nodes: TypesConnection_nodesPlan,
    edges: TypesConnection_edgesPlan,
    pageInfo: TypesConnection_pageInfoPlan,
    totalCount($connection) {
      return $connection.cloneSubplanWithoutPagination("aggregate").singleAsRecord().select(sql`count(*)`, TYPES.bigint);
    }
  },
  TypesEdge: {
    __assertStep: assertEdgeCapableStep,
    cursor($edge) {
      return $edge.cursor();
    },
    node($edge) {
      return $edge.node();
    }
  },
  PageInfo: {
    __assertStep: assertPageInfoCapableStep,
    hasNextPage: PageInfo_hasNextPagePlan,
    hasPreviousPage: PageInfo_hasPreviousPagePlan,
    startCursor($pageInfo) {
      return $pageInfo.startCursor();
    },
    endCursor($pageInfo) {
      return $pageInfo.endCursor();
    }
  },
  UpdatableViewsConnection: {
    __assertStep: ConnectionStep,
    nodes: UpdatableViewsConnection_nodesPlan,
    edges: UpdatableViewsConnection_edgesPlan,
    pageInfo: UpdatableViewsConnection_pageInfoPlan,
    totalCount($connection) {
      return $connection.cloneSubplanWithoutPagination("aggregate").singleAsRecord().select(sql`count(*)`, TYPES.bigint);
    }
  },
  UpdatableView: {
    __assertStep: assertPgClassSingleStep,
    x($record) {
      return $record.get("x");
    },
    name($record) {
      return $record.get("name");
    },
    description($record) {
      return $record.get("description");
    },
    constant($record) {
      return $record.get("constant");
    }
  },
  UpdatableViewsEdge: {
    __assertStep: assertEdgeCapableStep,
    cursor($edge) {
      return $edge.cursor();
    },
    node($edge) {
      return $edge.node();
    }
  },
  UpdatableViewsOrderBy: {
    NATURAL: {
      applyPlan() {}
    },
    X_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "x",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (true) {
          plan.setOrderIsUnique();
        }
      }
    },
    X_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "x",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (true) {
          plan.setOrderIsUnique();
        }
      }
    },
    NAME_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "name",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    NAME_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "name",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    DESCRIPTION_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "description",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    DESCRIPTION_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "description",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    CONSTANT_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "constant",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    CONSTANT_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "constant",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    }
  },
  UpdatableViewCondition: {
    x: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "x",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "x",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes_object_Object_.x.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    name: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "name",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "name",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes_object_Object_.name.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    description: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "description",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "description",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes_object_Object_.description.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    constant: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "constant",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "constant",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes_object_Object_.constant.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    }
  },
  TypesOrderBy: {
    NATURAL: {
      applyPlan() {}
    },
    PRIMARY_KEY_ASC: {
      applyPlan(step) {
        uniques4[0].attributes.forEach(attributeName => {
          const attribute = registryConfig_pgCodecs_types_types.attributes[attributeName];
          step.orderBy({
            codec: attribute.codec,
            fragment: sql`${step.alias}.${sql.identifier(attributeName)}`,
            direction: "ASC",
            ...(undefined != null ? {
              nulls: undefined ? "LAST" : "FIRST"
            } : null)
          });
        });
        step.setOrderIsUnique();
      }
    },
    PRIMARY_KEY_DESC: {
      applyPlan(step) {
        uniques4[0].attributes.forEach(attributeName => {
          const attribute = registryConfig_pgCodecs_types_types.attributes[attributeName];
          step.orderBy({
            codec: attribute.codec,
            fragment: sql`${step.alias}.${sql.identifier(attributeName)}`,
            direction: "DESC",
            ...(undefined != null ? {
              nulls: undefined ? "LAST" : "FIRST"
            } : null)
          });
        });
        step.setOrderIsUnique();
      }
    },
    ID_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "id",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (true) {
          plan.setOrderIsUnique();
        }
      }
    },
    ID_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "id",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (true) {
          plan.setOrderIsUnique();
        }
      }
    },
    SMALLINT_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "smallint",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    SMALLINT_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "smallint",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    BIGINT_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "bigint",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    BIGINT_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "bigint",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    NUMERIC_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "numeric",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    NUMERIC_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "numeric",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    DECIMAL_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "decimal",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    DECIMAL_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "decimal",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    BOOLEAN_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "boolean",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    BOOLEAN_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "boolean",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    VARCHAR_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "varchar",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    VARCHAR_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "varchar",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    ENUM_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "enum",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    ENUM_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "enum",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    DOMAIN_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "domain",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    DOMAIN_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "domain",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    DOMAIN2_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "domain2",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    DOMAIN2_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "domain2",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    JSON_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "json",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    JSON_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "json",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    JSONB_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "jsonb",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    JSONB_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "jsonb",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    TIMESTAMP_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "timestamp",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    TIMESTAMP_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "timestamp",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    TIMESTAMPTZ_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "timestamptz",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    TIMESTAMPTZ_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "timestamptz",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    DATE_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "date",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    DATE_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "date",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    TIME_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "time",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    TIME_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "time",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    TIMETZ_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "timetz",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    TIMETZ_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "timetz",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    INTERVAL_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "interval",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    INTERVAL_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "interval",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    MONEY_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "money",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    MONEY_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "money",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    COMPOUND_TYPE_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "compound_type",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    COMPOUND_TYPE_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "compound_type",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    NESTED_COMPOUND_TYPE_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "nested_compound_type",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    NESTED_COMPOUND_TYPE_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "nested_compound_type",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    NULLABLE_COMPOUND_TYPE_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "nullable_compound_type",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    NULLABLE_COMPOUND_TYPE_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "nullable_compound_type",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    NULLABLE_NESTED_COMPOUND_TYPE_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "nullable_nested_compound_type",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    NULLABLE_NESTED_COMPOUND_TYPE_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "nullable_nested_compound_type",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    POINT_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "point",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    POINT_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "point",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    NULLABLE_POINT_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "nullablePoint",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    NULLABLE_POINT_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "nullablePoint",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    INET_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "inet",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    INET_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "inet",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    CIDR_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "cidr",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    CIDR_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "cidr",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    MACADDR_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "macaddr",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    MACADDR_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "macaddr",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGPROC_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regproc",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGPROC_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regproc",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGPROCEDURE_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regprocedure",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGPROCEDURE_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regprocedure",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGOPER_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regoper",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGOPER_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regoper",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGOPERATOR_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regoperator",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGOPERATOR_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regoperator",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGCLASS_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regclass",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGCLASS_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regclass",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGTYPE_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regtype",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGTYPE_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regtype",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGCONFIG_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regconfig",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGCONFIG_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regconfig",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGDICTIONARY_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regdictionary",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    REGDICTIONARY_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "regdictionary",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    LTREE_ASC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "ltree",
          direction: "ASC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    },
    LTREE_DESC: {
      applyPlan(plan) {
        if (!(plan instanceof PgSelectStep) && !(plan instanceof PgUnionAllStep)) {
          throw new Error("Expected a PgSelectStep or PgUnionAllStep when applying ordering value");
        }
        plan.orderBy({
          attribute: "ltree",
          direction: "DESC",
          ...(undefined != null ? {
            nulls: undefined ? "LAST" : "FIRST"
          } : null)
        });
        if (false) {
          plan.setOrderIsUnique();
        }
      }
    }
  },
  TypeCondition: {
    id: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "id",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "id",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.id.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    smallint: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "smallint",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "smallint",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.smallint.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    bigint: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "bigint",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "bigint",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.bigint.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    numeric: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "numeric",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "numeric",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.numeric.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    decimal: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "decimal",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "decimal",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.decimal.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    boolean: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "boolean",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "boolean",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.boolean.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    varchar: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "varchar",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "varchar",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.varchar.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    enum: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "enum",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "enum",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.enum.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    enumArray: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "enum_array",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "enum_array",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.enum_array.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    domain: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "domain",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "domain",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.domain.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    domain2: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "domain2",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "domain2",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.domain2.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    textArray: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "text_array",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "text_array",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.text_array.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    json: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "json",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "json",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.json.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    jsonb: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "jsonb",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "jsonb",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.jsonb.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nullableRange: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "nullable_range",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "nullable_range",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.nullable_range.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    numrange: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "numrange",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "numrange",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.numrange.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    daterange: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "daterange",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "daterange",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.daterange.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    anIntRange: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "an_int_range",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "an_int_range",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.an_int_range.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    timestamp: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "timestamp",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "timestamp",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.timestamp.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    timestamptz: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "timestamptz",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "timestamptz",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.timestamptz.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    date: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "date",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "date",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.date.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    time: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "time",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "time",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.time.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    timetz: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "timetz",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "timetz",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.timetz.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    interval: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "interval",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "interval",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.interval.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    intervalArray: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "interval_array",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "interval_array",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.interval_array.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    money: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "money",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "money",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.money.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    compoundType: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "compound_type",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "compound_type",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.compound_type.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nestedCompoundType: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "nested_compound_type",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "nested_compound_type",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.nested_compound_type.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nullableCompoundType: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "nullable_compound_type",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "nullable_compound_type",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.nullable_compound_type.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nullableNestedCompoundType: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "nullable_nested_compound_type",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "nullable_nested_compound_type",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.nullable_nested_compound_type.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    point: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "point",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "point",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.point.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nullablePoint: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "nullablePoint",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "nullablePoint",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.nullablePoint.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    inet: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "inet",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "inet",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.inet.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    cidr: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "cidr",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "cidr",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.cidr.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    macaddr: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "macaddr",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "macaddr",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.macaddr.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regproc: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "regproc",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "regproc",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.regproc.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regprocedure: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "regprocedure",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "regprocedure",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.regprocedure.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regoper: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "regoper",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "regoper",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.regoper.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regoperator: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "regoperator",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "regoperator",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.regoperator.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regclass: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "regclass",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "regclass",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.regclass.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regtype: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "regtype",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "regtype",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.regtype.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regconfig: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "regconfig",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "regconfig",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.regconfig.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regdictionary: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "regdictionary",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "regdictionary",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.regdictionary.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    textArrayDomain: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "text_array_domain",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "text_array_domain",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.text_array_domain.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    int8ArrayDomain: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "int8_array_domain",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "int8_array_domain",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.int8_array_domain.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    ltree: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "ltree",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "ltree",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.ltree.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    ltreeArray: {
      applyPlan($condition, val) {
        if (val.getRaw().evalIs(null)) {
          $condition.where({
            type: "attribute",
            attribute: "ltree_array",
            callback(expression) {
              return sql`${expression} is null`;
            }
          });
        } else {
          $condition.where({
            type: "attribute",
            attribute: "ltree_array",
            callback(expression) {
              return sql`${expression} = ${$condition.placeholder(val.get(), attributes4.ltree_array.codec)}`;
            }
          });
        }
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    }
  },
  BigFloatRangeInput: {
    start: undefined,
    end: undefined
  },
  BigFloatRangeBoundInput: {
    value: undefined,
    inclusive: undefined
  },
  DateRangeInput: {
    start: undefined,
    end: undefined
  },
  DateRangeBoundInput: {
    value: undefined,
    inclusive: undefined
  },
  AnIntRangeInput: {
    start: undefined,
    end: undefined
  },
  AnIntRangeBoundInput: {
    value: undefined,
    inclusive: undefined
  },
  NestedCompoundTypeInput: {
    a: {
      applyPlan($insert, val) {
        $insert.set("a", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    b: {
      applyPlan($insert, val) {
        $insert.set("b", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    bazBuz: {
      applyPlan($insert, val) {
        $insert.set("baz_buz", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    }
  },
  PointInput: {
    x: undefined,
    y: undefined
  },
  Mutation: {
    __assertStep: __ValueStep,
    mult1: {
      plan($root, args, _info) {
        const selectArgs = makeArgs6(args, ["input"]);
        const $result = resource_mult_1PgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_mult1_input_applyPlan
        }
      }
    },
    mult2: {
      plan($root, args, _info) {
        const selectArgs = makeArgs7(args, ["input"]);
        const $result = resource_mult_2PgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_mult2_input_applyPlan
        }
      }
    },
    mult3: {
      plan($root, args, _info) {
        const selectArgs = makeArgs8(args, ["input"]);
        const $result = resource_mult_3PgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_mult3_input_applyPlan
        }
      }
    },
    mult4: {
      plan($root, args, _info) {
        const selectArgs = makeArgs9(args, ["input"]);
        const $result = resource_mult_4PgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_mult4_input_applyPlan
        }
      }
    },
    guidFn: {
      plan($root, args, _info) {
        const selectArgs = makeArgs10(args, ["input"]);
        const $result = resource_guid_fnPgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_guidFn_input_applyPlan
        }
      }
    },
    authenticateFail: {
      plan($root, args, _info) {
        const selectArgs = makeArgs11(args, ["input"]);
        const $result = resource_authenticate_failPgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_authenticateFail_input_applyPlan
        }
      }
    },
    authenticate: {
      plan($root, args, _info) {
        const selectArgs = makeArgs12(args, ["input"]);
        const $result = resource_authenticatePgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_authenticate_input_applyPlan
        }
      }
    },
    listBdeMutation: {
      plan($root, args, _info) {
        const selectArgs = makeArgs13(args, ["input"]);
        const $result = resource_list_bde_mutationPgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_listBdeMutation_input_applyPlan
        }
      }
    },
    authenticateMany: {
      plan($root, args, _info) {
        const selectArgs = makeArgs14(args, ["input"]);
        const $result = resource_authenticate_manyPgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_authenticateMany_input_applyPlan
        }
      }
    },
    authenticatePayload: {
      plan($root, args, _info) {
        const selectArgs = makeArgs15(args, ["input"]);
        const $result = resource_authenticate_payloadPgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_authenticatePayload_input_applyPlan
        }
      }
    },
    compoundTypeMutation: {
      plan($root, args, _info) {
        const selectArgs = makeArgs16(args, ["input"]);
        const $result = resource_compound_type_mutationPgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_compoundTypeMutation_input_applyPlan
        }
      }
    },
    compoundTypeSetMutation: {
      plan($root, args, _info) {
        const selectArgs = makeArgs17(args, ["input"]);
        const $result = resource_compound_type_set_mutationPgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_compoundTypeSetMutation_input_applyPlan
        }
      }
    },
    compoundTypeArrayMutation: {
      plan($root, args, _info) {
        const selectArgs = makeArgs18(args, ["input"]);
        const $result = resource_compound_type_array_mutationPgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_compoundTypeArrayMutation_input_applyPlan
        }
      }
    },
    typeFunctionConnectionMutation: {
      plan($root, args, _info) {
        const selectArgs = makeArgs19(args, ["input"]);
        const $result = resource_type_function_connection_mutationPgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_typeFunctionConnectionMutation_input_applyPlan
        }
      }
    },
    typeFunctionMutation: {
      plan($root, args, _info) {
        const selectArgs = makeArgs20(args, ["input"]);
        const $result = resource_type_function_mutationPgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_typeFunctionMutation_input_applyPlan
        }
      }
    },
    typeFunctionListMutation: {
      plan($root, args, _info) {
        const selectArgs = makeArgs21(args, ["input"]);
        const $result = resource_type_function_list_mutationPgResource.execute(selectArgs, "mutation");
        return object({
          result: $result
        });
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_typeFunctionListMutation_input_applyPlan
        }
      }
    },
    createUpdatableView: {
      plan(_, args) {
        const plan = object({
          result: pgInsertSingle(resource_updatable_viewPgResource, Object.create(null))
        });
        args.apply(plan);
        return plan;
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_createUpdatableView_input_applyPlan
        }
      }
    },
    createType: {
      plan(_, args) {
        const plan = object({
          result: pgInsertSingle(pgResource_typesPgResource, Object.create(null))
        });
        args.apply(plan);
        return plan;
      },
      args: {
        input: {
          autoApplyAfterParentPlan: true,
          applyPlan: Mutation_createType_input_applyPlan
        }
      }
    },
    updateType: {
      plan(_$root, args) {
        const plan = object({
          result: pgUpdateSingle(pgResource_typesPgResource, specFromArgs(args))
        });
        args.apply(plan);
        return plan;
      },
      args: {
        input: {
          applyPlan: Mutation_updateType_input_applyPlan
        }
      }
    },
    updateTypeById: {
      plan(_$root, args) {
        const plan = object({
          result: pgUpdateSingle(pgResource_typesPgResource, {
            id: args.get(['input', "id"])
          })
        });
        args.apply(plan);
        return plan;
      },
      args: {
        input: {
          applyPlan: Mutation_updateTypeById_input_applyPlan
        }
      }
    },
    deleteType: {
      plan(_$root, args) {
        const plan = object({
          result: pgDeleteSingle(pgResource_typesPgResource, specFromArgs2(args))
        });
        args.apply(plan);
        return plan;
      },
      args: {
        input: {
          applyPlan: Mutation_deleteType_input_applyPlan
        }
      }
    },
    deleteTypeById: {
      plan(_$root, args) {
        const plan = object({
          result: pgDeleteSingle(pgResource_typesPgResource, {
            id: args.get(['input', "id"])
          })
        });
        args.apply(plan);
        return plan;
      },
      args: {
        input: {
          applyPlan: Mutation_deleteTypeById_input_applyPlan
        }
      }
    }
  },
  Mult1Payload: {
    __assertStep: ObjectStep,
    clientMutationId: Mult1Payload_clientMutationIdPlan,
    integer($object) {
      return $object.get("result");
    },
    query: Mult1Payload_queryPlan
  },
  Mult1Input: {
    clientMutationId: {
      applyPlan: Mult1Input_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    arg0: undefined,
    arg1: undefined
  },
  Mult2Payload: {
    __assertStep: ObjectStep,
    clientMutationId: Mult2Payload_clientMutationIdPlan,
    integer($object) {
      return $object.get("result");
    },
    query: Mult2Payload_queryPlan
  },
  Mult2Input: {
    clientMutationId: {
      applyPlan: Mult2Input_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    arg0: undefined,
    arg1: undefined
  },
  Mult3Payload: {
    __assertStep: ObjectStep,
    clientMutationId: Mult3Payload_clientMutationIdPlan,
    integer($object) {
      return $object.get("result");
    },
    query: Mult3Payload_queryPlan
  },
  Mult3Input: {
    clientMutationId: {
      applyPlan: Mult3Input_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    arg0: undefined,
    arg1: undefined
  },
  Mult4Payload: {
    __assertStep: ObjectStep,
    clientMutationId: Mult4Payload_clientMutationIdPlan,
    integer($object) {
      return $object.get("result");
    },
    query: Mult4Payload_queryPlan
  },
  Mult4Input: {
    clientMutationId: {
      applyPlan: Mult4Input_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    arg0: undefined,
    arg1: undefined
  },
  GuidFnPayload: {
    __assertStep: ObjectStep,
    clientMutationId: GuidFnPayload_clientMutationIdPlan,
    guid($object) {
      return $object.get("result");
    },
    query: GuidFnPayload_queryPlan
  },
  GuidFnInput: {
    clientMutationId: {
      applyPlan: GuidFnInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    g: undefined
  },
  AuthenticateFailPayload: {
    __assertStep: ObjectStep,
    clientMutationId: AuthenticateFailPayload_clientMutationIdPlan,
    jwtToken($object) {
      return $object.get("result");
    },
    query: AuthenticateFailPayload_queryPlan
  },
  JwtToken: {
    serialize(value) {
      const token = attributeNames.reduce((memo, attributeName) => {
        if (attributeName === "exp") {
          memo[attributeName] = value[attributeName] ? parseFloat(value[attributeName]) : undefined;
        } else {
          memo[attributeName] = value[attributeName];
        }
        return memo;
      }, {});
      const options = Object.assign(Object.create(null), undefined, token.aud || undefined && undefined.audience ? null : {
        audience: "postgraphile"
      }, token.iss || undefined && undefined.issuer ? null : {
        issuer: "postgraphile"
      }, token.exp || undefined && undefined.expiresIn ? null : {
        expiresIn: "1 day"
      });
      return jsonwebtoken.sign(token, "secret", options);
    },
    parseValue: JwtTokenParseValue,
    parseLiteral(node, variables) {
      return JwtTokenParseValue(valueFromASTUntyped(node, variables));
    },
    plan: JwtTokenPlan
  },
  AuthenticateFailInput: {
    clientMutationId: {
      applyPlan: AuthenticateFailInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    }
  },
  AuthenticatePayload: {
    __assertStep: ObjectStep,
    clientMutationId: AuthenticatePayload_clientMutationIdPlan,
    jwtToken($object) {
      return $object.get("result");
    },
    query: AuthenticatePayload_queryPlan
  },
  AuthenticateInput: {
    clientMutationId: {
      applyPlan: AuthenticateInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    a: undefined,
    b: undefined,
    c: undefined
  },
  ListBdeMutationPayload: {
    __assertStep: ObjectStep,
    clientMutationId: ListBdeMutationPayload_clientMutationIdPlan,
    uuids($object) {
      return $object.get("result");
    },
    query: ListBdeMutationPayload_queryPlan
  },
  ListBdeMutationInput: {
    clientMutationId: {
      applyPlan: ListBdeMutationInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    b: undefined,
    d: undefined,
    e: undefined
  },
  AuthenticateManyPayload: {
    __assertStep: ObjectStep,
    clientMutationId: AuthenticateManyPayload_clientMutationIdPlan,
    jwtTokens($object) {
      return $object.get("result");
    },
    query: AuthenticateManyPayload_queryPlan
  },
  AuthenticateManyInput: {
    clientMutationId: {
      applyPlan: AuthenticateManyInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    a: undefined,
    b: undefined,
    c: undefined
  },
  AuthenticatePayloadPayload: {
    __assertStep: ObjectStep,
    clientMutationId: AuthenticatePayloadPayload_clientMutationIdPlan,
    authPayload($object) {
      return $object.get("result");
    },
    query: AuthenticatePayloadPayload_queryPlan
  },
  AuthPayload: {
    __assertStep: assertPgClassSingleStep,
    jwt($record) {
      const $plan = $record.get("jwt");
      const $select = pgSelectSingleFromRecord(resource_frmcdc_jwtTokenPgResource, $plan);
      if (undefined) {
        $select.coalesceToEmptyObject();
      }
      $select.getClassStep().setTrusted();
      return $select;
    },
    id($record) {
      return $record.get("id");
    },
    admin($record) {
      return $record.get("admin");
    }
  },
  AuthenticatePayloadInput: {
    clientMutationId: {
      applyPlan: AuthenticatePayloadInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    a: undefined,
    b: undefined,
    c: undefined
  },
  CompoundTypeMutationPayload: {
    __assertStep: ObjectStep,
    clientMutationId: CompoundTypeMutationPayload_clientMutationIdPlan,
    compoundType($object) {
      return $object.get("result");
    },
    query: CompoundTypeMutationPayload_queryPlan
  },
  CompoundTypeMutationInput: {
    clientMutationId: {
      applyPlan: CompoundTypeMutationInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    object: undefined
  },
  CompoundTypeSetMutationPayload: {
    __assertStep: ObjectStep,
    clientMutationId: CompoundTypeSetMutationPayload_clientMutationIdPlan,
    compoundTypes($object) {
      return $object.get("result");
    },
    query: CompoundTypeSetMutationPayload_queryPlan
  },
  CompoundTypeSetMutationInput: {
    clientMutationId: {
      applyPlan: CompoundTypeSetMutationInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    object: undefined
  },
  CompoundTypeArrayMutationPayload: {
    __assertStep: ObjectStep,
    clientMutationId: CompoundTypeArrayMutationPayload_clientMutationIdPlan,
    compoundTypes($object) {
      return $object.get("result");
    },
    query: CompoundTypeArrayMutationPayload_queryPlan
  },
  CompoundTypeArrayMutationInput: {
    clientMutationId: {
      applyPlan: CompoundTypeArrayMutationInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    object: undefined
  },
  TypeFunctionConnectionMutationPayload: {
    __assertStep: ObjectStep,
    clientMutationId: TypeFunctionConnectionMutationPayload_clientMutationIdPlan,
    types($object) {
      return $object.get("result");
    },
    query: TypeFunctionConnectionMutationPayload_queryPlan
  },
  TypeFunctionConnectionMutationInput: {
    clientMutationId: {
      applyPlan: TypeFunctionConnectionMutationInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    }
  },
  TypeFunctionMutationPayload: {
    __assertStep: ObjectStep,
    clientMutationId: TypeFunctionMutationPayload_clientMutationIdPlan,
    type($object) {
      return $object.get("result");
    },
    query: TypeFunctionMutationPayload_queryPlan,
    typeEdge: {
      plan($mutation, args, info) {
        const $result = $mutation.getStepForKey("result", true);
        if (!$result) {
          return constant(null);
        }
        const $select = (() => {
          if ($result instanceof PgDeleteSingleStep) {
            return pgSelectFromRecord($result.resource, $result.record());
          } else {
            const spec = uniques4[0].attributes.reduce((memo, attributeName) => {
              memo[attributeName] = $result.get(attributeName);
              return memo;
            }, Object.create(null));
            return pgResource_typesPgResource.find(spec);
          }
        })();
        // Perform ordering
        const $value = args.getRaw("orderBy");
        applyOrderToPlan($select, $value, info.schema.getType("TypesOrderBy"));
        const $connection = connection($select);
        // NOTE: you must not use `$single = $select.single()`
        // here because doing so will mark the row as unique, and
        // then the ordering logic (and thus cursor) will differ.
        const $single = $select.row(first($select));
        return new EdgeStep($connection, $single);
      },
      args: {
        orderBy: undefined
      }
    }
  },
  TypeFunctionMutationInput: {
    clientMutationId: {
      applyPlan: TypeFunctionMutationInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    id: undefined
  },
  TypeFunctionListMutationPayload: {
    __assertStep: ObjectStep,
    clientMutationId: TypeFunctionListMutationPayload_clientMutationIdPlan,
    types($object) {
      return $object.get("result");
    },
    query: TypeFunctionListMutationPayload_queryPlan
  },
  TypeFunctionListMutationInput: {
    clientMutationId: {
      applyPlan: TypeFunctionListMutationInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    }
  },
  CreateUpdatableViewPayload: {
    __assertStep: assertExecutableStep,
    clientMutationId: CreateUpdatableViewPayload_clientMutationIdPlan,
    updatableView: CreateUpdatableViewPayload_updatableViewPlan,
    query: CreateUpdatableViewPayload_queryPlan
  },
  CreateUpdatableViewInput: {
    clientMutationId: {
      applyPlan: CreateUpdatableViewInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    updatableView: {
      applyPlan: CreateUpdatableViewInput_updatableView_applyPlan,
      autoApplyAfterParentApplyPlan: true
    }
  },
  UpdatableViewInput: {
    x: {
      applyPlan($insert, val) {
        $insert.set("x", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    name: {
      applyPlan($insert, val) {
        $insert.set("name", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    description: {
      applyPlan($insert, val) {
        $insert.set("description", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    constant: {
      applyPlan($insert, val) {
        $insert.set("constant", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    }
  },
  CreateTypePayload: {
    __assertStep: assertExecutableStep,
    clientMutationId: CreateTypePayload_clientMutationIdPlan,
    type: CreateTypePayload_typePlan,
    query: CreateTypePayload_queryPlan,
    typeEdge: {
      plan($mutation, args, info) {
        const $result = $mutation.getStepForKey("result", true);
        if (!$result) {
          return constant(null);
        }
        const $select = (() => {
          if ($result instanceof PgDeleteSingleStep) {
            return pgSelectFromRecord($result.resource, $result.record());
          } else {
            const spec = uniques4[0].attributes.reduce((memo, attributeName) => {
              memo[attributeName] = $result.get(attributeName);
              return memo;
            }, Object.create(null));
            return pgResource_typesPgResource.find(spec);
          }
        })();
        // Perform ordering
        const $value = args.getRaw("orderBy");
        applyOrderToPlan($select, $value, info.schema.getType("TypesOrderBy"));
        const $connection = connection($select);
        // NOTE: you must not use `$single = $select.single()`
        // here because doing so will mark the row as unique, and
        // then the ordering logic (and thus cursor) will differ.
        const $single = $select.row(first($select));
        return new EdgeStep($connection, $single);
      },
      args: {
        orderBy: undefined
      }
    }
  },
  CreateTypeInput: {
    clientMutationId: {
      applyPlan: CreateTypeInput_clientMutationId_applyPlan,
      autoApplyAfterParentApplyPlan: true
    },
    type: {
      applyPlan: CreateTypeInput_type_applyPlan,
      autoApplyAfterParentApplyPlan: true
    }
  },
  TypeInput: {
    id: {
      applyPlan($insert, val) {
        $insert.set("id", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    smallint: {
      applyPlan($insert, val) {
        $insert.set("smallint", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    bigint: {
      applyPlan($insert, val) {
        $insert.set("bigint", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    numeric: {
      applyPlan($insert, val) {
        $insert.set("numeric", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    decimal: {
      applyPlan($insert, val) {
        $insert.set("decimal", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    boolean: {
      applyPlan($insert, val) {
        $insert.set("boolean", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    varchar: {
      applyPlan($insert, val) {
        $insert.set("varchar", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    enum: {
      applyPlan($insert, val) {
        $insert.set("enum", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    enumArray: {
      applyPlan($insert, val) {
        $insert.set("enum_array", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    domain: {
      applyPlan($insert, val) {
        $insert.set("domain", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    domain2: {
      applyPlan($insert, val) {
        $insert.set("domain2", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    textArray: {
      applyPlan($insert, val) {
        $insert.set("text_array", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    json: {
      applyPlan($insert, val) {
        $insert.set("json", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    jsonb: {
      applyPlan($insert, val) {
        $insert.set("jsonb", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nullableRange: {
      applyPlan($insert, val) {
        $insert.set("nullable_range", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    numrange: {
      applyPlan($insert, val) {
        $insert.set("numrange", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    daterange: {
      applyPlan($insert, val) {
        $insert.set("daterange", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    anIntRange: {
      applyPlan($insert, val) {
        $insert.set("an_int_range", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    timestamp: {
      applyPlan($insert, val) {
        $insert.set("timestamp", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    timestamptz: {
      applyPlan($insert, val) {
        $insert.set("timestamptz", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    date: {
      applyPlan($insert, val) {
        $insert.set("date", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    time: {
      applyPlan($insert, val) {
        $insert.set("time", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    timetz: {
      applyPlan($insert, val) {
        $insert.set("timetz", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    interval: {
      applyPlan($insert, val) {
        $insert.set("interval", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    intervalArray: {
      applyPlan($insert, val) {
        $insert.set("interval_array", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    money: {
      applyPlan($insert, val) {
        $insert.set("money", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    compoundType: {
      applyPlan($insert, val) {
        $insert.set("compound_type", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nestedCompoundType: {
      applyPlan($insert, val) {
        $insert.set("nested_compound_type", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nullableCompoundType: {
      applyPlan($insert, val) {
        $insert.set("nullable_compound_type", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nullableNestedCompoundType: {
      applyPlan($insert, val) {
        $insert.set("nullable_nested_compound_type", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    point: {
      applyPlan($insert, val) {
        $insert.set("point", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nullablePoint: {
      applyPlan($insert, val) {
        $insert.set("nullablePoint", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    inet: {
      applyPlan($insert, val) {
        $insert.set("inet", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    cidr: {
      applyPlan($insert, val) {
        $insert.set("cidr", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    macaddr: {
      applyPlan($insert, val) {
        $insert.set("macaddr", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regproc: {
      applyPlan($insert, val) {
        $insert.set("regproc", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regprocedure: {
      applyPlan($insert, val) {
        $insert.set("regprocedure", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regoper: {
      applyPlan($insert, val) {
        $insert.set("regoper", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regoperator: {
      applyPlan($insert, val) {
        $insert.set("regoperator", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regclass: {
      applyPlan($insert, val) {
        $insert.set("regclass", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regtype: {
      applyPlan($insert, val) {
        $insert.set("regtype", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regconfig: {
      applyPlan($insert, val) {
        $insert.set("regconfig", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regdictionary: {
      applyPlan($insert, val) {
        $insert.set("regdictionary", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    textArrayDomain: {
      applyPlan($insert, val) {
        $insert.set("text_array_domain", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    int8ArrayDomain: {
      applyPlan($insert, val) {
        $insert.set("int8_array_domain", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    bytea: {
      applyPlan($insert, val) {
        $insert.set("bytea", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    byteaArray: {
      applyPlan($insert, val) {
        $insert.set("bytea_array", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    ltree: {
      applyPlan($insert, val) {
        $insert.set("ltree", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    ltreeArray: {
      applyPlan($insert, val) {
        $insert.set("ltree_array", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    }
  },
  UpdateTypePayload: {
    __assertStep: ObjectStep,
    clientMutationId: UpdateTypePayload_clientMutationIdPlan,
    type: UpdateTypePayload_typePlan,
    query: UpdateTypePayload_queryPlan,
    typeEdge: {
      plan($mutation, args, info) {
        const $result = $mutation.getStepForKey("result", true);
        if (!$result) {
          return constant(null);
        }
        const $select = (() => {
          if ($result instanceof PgDeleteSingleStep) {
            return pgSelectFromRecord($result.resource, $result.record());
          } else {
            const spec = uniques4[0].attributes.reduce((memo, attributeName) => {
              memo[attributeName] = $result.get(attributeName);
              return memo;
            }, Object.create(null));
            return pgResource_typesPgResource.find(spec);
          }
        })();
        // Perform ordering
        const $value = args.getRaw("orderBy");
        applyOrderToPlan($select, $value, info.schema.getType("TypesOrderBy"));
        const $connection = connection($select);
        // NOTE: you must not use `$single = $select.single()`
        // here because doing so will mark the row as unique, and
        // then the ordering logic (and thus cursor) will differ.
        const $single = $select.row(first($select));
        return new EdgeStep($connection, $single);
      },
      args: {
        orderBy: undefined
      }
    }
  },
  UpdateTypeInput: {
    clientMutationId: {
      applyPlan: UpdateTypeInput_clientMutationId_applyPlan
    },
    nodeId: undefined,
    typePatch: {
      applyPlan: UpdateTypeInput_typePatch_applyPlan
    }
  },
  TypePatch: {
    id: {
      applyPlan($insert, val) {
        $insert.set("id", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    smallint: {
      applyPlan($insert, val) {
        $insert.set("smallint", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    bigint: {
      applyPlan($insert, val) {
        $insert.set("bigint", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    numeric: {
      applyPlan($insert, val) {
        $insert.set("numeric", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    decimal: {
      applyPlan($insert, val) {
        $insert.set("decimal", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    boolean: {
      applyPlan($insert, val) {
        $insert.set("boolean", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    varchar: {
      applyPlan($insert, val) {
        $insert.set("varchar", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    enum: {
      applyPlan($insert, val) {
        $insert.set("enum", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    enumArray: {
      applyPlan($insert, val) {
        $insert.set("enum_array", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    domain: {
      applyPlan($insert, val) {
        $insert.set("domain", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    domain2: {
      applyPlan($insert, val) {
        $insert.set("domain2", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    textArray: {
      applyPlan($insert, val) {
        $insert.set("text_array", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    json: {
      applyPlan($insert, val) {
        $insert.set("json", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    jsonb: {
      applyPlan($insert, val) {
        $insert.set("jsonb", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nullableRange: {
      applyPlan($insert, val) {
        $insert.set("nullable_range", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    numrange: {
      applyPlan($insert, val) {
        $insert.set("numrange", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    daterange: {
      applyPlan($insert, val) {
        $insert.set("daterange", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    anIntRange: {
      applyPlan($insert, val) {
        $insert.set("an_int_range", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    timestamp: {
      applyPlan($insert, val) {
        $insert.set("timestamp", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    timestamptz: {
      applyPlan($insert, val) {
        $insert.set("timestamptz", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    date: {
      applyPlan($insert, val) {
        $insert.set("date", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    time: {
      applyPlan($insert, val) {
        $insert.set("time", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    timetz: {
      applyPlan($insert, val) {
        $insert.set("timetz", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    interval: {
      applyPlan($insert, val) {
        $insert.set("interval", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    intervalArray: {
      applyPlan($insert, val) {
        $insert.set("interval_array", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    money: {
      applyPlan($insert, val) {
        $insert.set("money", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    compoundType: {
      applyPlan($insert, val) {
        $insert.set("compound_type", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nestedCompoundType: {
      applyPlan($insert, val) {
        $insert.set("nested_compound_type", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nullableCompoundType: {
      applyPlan($insert, val) {
        $insert.set("nullable_compound_type", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nullableNestedCompoundType: {
      applyPlan($insert, val) {
        $insert.set("nullable_nested_compound_type", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    point: {
      applyPlan($insert, val) {
        $insert.set("point", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    nullablePoint: {
      applyPlan($insert, val) {
        $insert.set("nullablePoint", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    inet: {
      applyPlan($insert, val) {
        $insert.set("inet", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    cidr: {
      applyPlan($insert, val) {
        $insert.set("cidr", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    macaddr: {
      applyPlan($insert, val) {
        $insert.set("macaddr", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regproc: {
      applyPlan($insert, val) {
        $insert.set("regproc", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regprocedure: {
      applyPlan($insert, val) {
        $insert.set("regprocedure", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regoper: {
      applyPlan($insert, val) {
        $insert.set("regoper", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regoperator: {
      applyPlan($insert, val) {
        $insert.set("regoperator", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regclass: {
      applyPlan($insert, val) {
        $insert.set("regclass", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regtype: {
      applyPlan($insert, val) {
        $insert.set("regtype", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regconfig: {
      applyPlan($insert, val) {
        $insert.set("regconfig", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    regdictionary: {
      applyPlan($insert, val) {
        $insert.set("regdictionary", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    textArrayDomain: {
      applyPlan($insert, val) {
        $insert.set("text_array_domain", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    int8ArrayDomain: {
      applyPlan($insert, val) {
        $insert.set("int8_array_domain", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    bytea: {
      applyPlan($insert, val) {
        $insert.set("bytea", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    byteaArray: {
      applyPlan($insert, val) {
        $insert.set("bytea_array", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    ltree: {
      applyPlan($insert, val) {
        $insert.set("ltree", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    },
    ltreeArray: {
      applyPlan($insert, val) {
        $insert.set("ltree_array", val.get());
      },
      autoApplyAfterParentInputPlan: true,
      autoApplyAfterParentApplyPlan: true
    }
  },
  UpdateTypeByIdInput: {
    clientMutationId: {
      applyPlan: UpdateTypeByIdInput_clientMutationId_applyPlan
    },
    id: undefined,
    typePatch: {
      applyPlan: UpdateTypeByIdInput_typePatch_applyPlan
    }
  },
  DeleteTypePayload: {
    __assertStep: ObjectStep,
    clientMutationId: DeleteTypePayload_clientMutationIdPlan,
    type: DeleteTypePayload_typePlan,
    deletedTypeId($object) {
      const $record = $object.getStepForKey("result");
      const specifier = nodeIdHandlerByTypeName.Type.plan($record);
      return lambda(specifier, nodeIdCodecs_base64JSON_base64JSON.encode);
    },
    query: DeleteTypePayload_queryPlan,
    typeEdge: {
      plan($mutation, args, info) {
        const $result = $mutation.getStepForKey("result", true);
        if (!$result) {
          return constant(null);
        }
        const $select = (() => {
          if ($result instanceof PgDeleteSingleStep) {
            return pgSelectFromRecord($result.resource, $result.record());
          } else {
            const spec = uniques4[0].attributes.reduce((memo, attributeName) => {
              memo[attributeName] = $result.get(attributeName);
              return memo;
            }, Object.create(null));
            return pgResource_typesPgResource.find(spec);
          }
        })();
        // Perform ordering
        const $value = args.getRaw("orderBy");
        applyOrderToPlan($select, $value, info.schema.getType("TypesOrderBy"));
        const $connection = connection($select);
        // NOTE: you must not use `$single = $select.single()`
        // here because doing so will mark the row as unique, and
        // then the ordering logic (and thus cursor) will differ.
        const $single = $select.row(first($select));
        return new EdgeStep($connection, $single);
      },
      args: {
        orderBy: undefined
      }
    }
  },
  DeleteTypeInput: {
    clientMutationId: {
      applyPlan: DeleteTypeInput_clientMutationId_applyPlan
    },
    nodeId: undefined
  },
  DeleteTypeByIdInput: {
    clientMutationId: {
      applyPlan: DeleteTypeByIdInput_clientMutationId_applyPlan
    },
    id: undefined
  }
};
export const schema = makeGrafastSchema({
  typeDefs: typeDefs,
  plans: plans
});