<template>
<div class="page-container">
  <section class="page-section" v-in-viewport.once>
    <div class="section-header">
      <h4 class="section-title">Similar to Ellie Goulding</h4>
    </div>
    <div class="section-items-container">
      <sectionitem v-for="item of similar" type="stage" :key="item.title" :image="item.image" :title="item.title" :subtitle="item.subtitle"></sectionitem>
    </div>
  </section>
</div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: true,
      similar: [{
          title: "Carly Rae Jepsen",
          subtitle: "Pop",
          image: "https://i.scdn.co/image/1e0dec2c670988638af24e4755dfb260f295f409"
        },
        {
          title: "Rita Ora",
          subtitle: "Pop",
          image: "https://i.scdn.co/image/9619b6fc1d545319095054ff6f112b6fb6af78f2"
        },
        {
          title: "Birdy",
          subtitle: "Pop",
          image: "https://i.scdn.co/image/1de4a0124740841da21bac08084fbf1161ec97ab"
        },
        {
          title: "Jess Glynne",
          subtitle: "Pop",
          image: "https://i.scdn.co/image/ebf29d2f98abdedb754d32372da2dec7f0f1c49b"
        },
        {
          title: "Olly Murs",
          subtitle: "Pop",
          image: "https://i.scdn.co/image/48f16a4c5913005dbea716cce43fde74cfc35301"
        },
        {
          title: "Kesha",
          subtitle: "Pop",
          image: "https://i.scdn.co/image/bedf829597cae2d1b6732b505532bff0310c267b"
        }
      ]
    }
  }
}
</script>
