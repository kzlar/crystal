# pgl - PostGraphile CLI

[![GitHub Sponsors](https://img.shields.io/github/sponsors/benjie?color=ff69b4&label=github%20sponsors)](https://github.com/sponsors/benjie)
[![Patreon sponsor button](https://img.shields.io/badge/sponsor-via%20Patreon-orange.svg)](https://patreon.com/benjie)
[![Discord chat room](https://img.shields.io/discord/489127045289476126.svg)](http://discord.gg/graphile)
[![Follow](https://img.shields.io/badge/twitter-@GraphileHQ-blue.svg)](https://twitter.com/GraphileHQ)

_**Instant lightning-fast GraphQL API backed primarily by your PostgreSQL
database. Highly customisable and extensible thanks to incredibly powerful
plugin system.**_

**Documentation**: https://postgraphile.org/postgraphile/next/

This is a shortcut to the `postgraphile` binary that also takes care of
installing all the peerDependencies for you. It's intended specifically for
compatibility with `npx`:

```
npx pgl@beta -P pgl/amber -c postgres:///my_db

# Or: npx pgl@beta -P postgraphile/preset/amber -c postgres://user:pass@host:port/dbname -s my_schema
```

<!-- SPONSORS_BEGIN -->

## Crowd-funded open-source software

To help us develop this software sustainably, we ask all individuals and
businesses that use it to help support its ongoing maintenance and development
via sponsorship.

### [Click here to find out more about sponsors and sponsorship.](https://www.graphile.org/sponsor/)

And please give some love to our featured sponsors 🤩:

<table><tr>
<td align="center"><a href="https://www.the-guild.dev/"><img src="https://graphile.org/images/sponsors/theguild.png" width="90" height="90" alt="The Guild" /><br />The Guild</a> *</td>
<td align="center"><a href="https://gosteelhead.com/"><img src="https://graphile.org/images/sponsors/steelhead.svg" width="90" height="90" alt="Steelhead" /><br />Steelhead</a> *</td>
</tr></table>

<em>\* Sponsors the entire Graphile suite</em>

<!-- SPONSORS_END -->

## Thanks

The `pgl` module was previously
[pgl@0.0.6](https://www.npmjs.com/package/pgl/v/0.0.6) (GitHub:
https://github.com/mattholl/pgl). The package name was generously transferred to
the PostGraphile project by [Matthew Hollings](https://github.com/mattholl).
Thanks Matthew!
