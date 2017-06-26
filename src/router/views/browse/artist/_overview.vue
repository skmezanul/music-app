<template>
<div class="page-container">
  <section class="page-section" v-in-viewport.once>
    <div class="section-header">
      <h4 class="section-title">Top Tracks</h4>
    </div>
    <flextable></flextable>
  </section>
  <section class="page-section" v-in-viewport.once>
    <div class="section-header">
      <h4 class="section-title">Top Singles</h4>
      <div class="section-actions">more</div>
    </div>
    <div class="section-items-container">
      <sectionitem image="/static/images/cover4.png" title="First Time" subtitle="Kygo"></sectionitem>
      <sectionitem image="/static/images/cover3.png" title="Still Falling For You" subtitle="Ellie Goulding"></sectionitem>
      <sectionitem image="/static/images/cover2.png" title="Love Me Like You Do" subtitle="Ellie Goulding"></sectionitem>
      <sectionitem image="/static/images/cover1.png" title="Burn" subtitle="Ellie Goulding"></sectionitem>
      <sectionitem image="/static/images/cover5.png" title="Burn" subtitle="Ellie Goulding"></sectionitem>
      <sectionitem image="/static/images/cover3.png" title="Still Falling For You" subtitle="Ellie Goulding"></sectionitem>
      <sectionitem image="/static/images/cover4.png" title="First Time" subtitle="Kygo"></sectionitem>
      <sectionitem image="/static/images/cover5.png" title="Burn" subtitle="Ellie Goulding"></sectionitem>
      <sectionitem image="/static/images/cover2.png" title="Love Me Like You Do" subtitle="Ellie Goulding"></sectionitem>
    </div>
  </section>
</div>
</template>
