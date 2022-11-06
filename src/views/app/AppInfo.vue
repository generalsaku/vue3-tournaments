<template>
  <section class="p-12">
    <h2 class="text-4xl">Standing info</h2>
    <ul class="ml-10">
      <li>
        <span>GP</span><br />
        Games played - Number of games the team has played
      </li>
      <li>
        <span>W</span><br />
        Wins - Games the team has won
      </li>
      <li>
        <span>L</span><br />
        Losses - Games the team has lost
      </li>
      <li>
        <span>OTL</span><br />
        Overtime losses - Games the team has lost in overtime
      </li>
      <li>
        <span>GF</span><br />
        Goals for - Number of goals the team has scored
      </li>
      <li>
        <span>GA</span><br />
        Goals against - Number of goals scored against the team
      </li>
      <li>
        <span>Diff</span><br />
        Goal Difference (used as standings tie breaker)
      </li>
      <li>
        <span>Pts</span><br />
        Points - Team points, calculated from W, OTL (W=2, OTL=1)
      </li>
    </ul>
  </section>
</template>

<style lang="less" scoped>
ul {
  list-style: circle;
}
</style>
