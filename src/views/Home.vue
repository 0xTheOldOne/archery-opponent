<template>
  <b-container class="home-container">
    <b-row>
      <b-col>
        <!-- <h1 class="mb-5">{{ $t("app") }}</h1> -->
        <div class="content">
          <p>{{ $t("pages.home.intro_1") }}</p>
          <p>{{ $t("pages.home.intro_2") }}</p>
          <div class="spacer"></div>
          <p>
            {{ $t("pages.home.intro_3") }}
            <b-navbar-toggle target="nav-collapse" class="ml-2">
              <template #default="{ expanded }">
                <b-icon v-if="expanded" icon="chevron-up"></b-icon>
                <b-icon v-else icon="list"></b-icon>
              </template>
            </b-navbar-toggle>
          </p>
          <div class="spacer"></div>
          <p>{{ $t("pages.home.menu.settings") }}</p>
          <p>{{ $t("pages.home.menu.round") }}</p>
          <p>{{ $t("pages.home.menu.match") }}</p>
        </div>
        <div class="spacer"></div>
        <div class="locales">
          <div class="locale" v-for="locale in locales" :key="locale.code" @click="setLocale(locale.code)">
            <div v-if="$i18n.locale != locale.code">
              <b-img rounded="circle" :src="'flag_' + locale.code + '.png'" class="ml-1 mr-1" />
              <p>{{ locale.name }}</p>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getSupportedLocales } from "../locales/helper";
import { getBrowserLocale } from "../locales/helper";

export default {
  name: "Home",
  data() {
    return {
      locales: getSupportedLocales(),
      browserLocale: getBrowserLocale({ countryCodeOnly: true }),
    };
  },
  methods: {
    setLocale(locale) {
      console.debug("🌐 Previous $i18n.locale : " + this.$i18n.locale);
      this.$store.commit({
        type: "setUserLocale",
        locale: locale,
      });
      this.$i18n.locale = locale;
    },
  },
  mounted() {
    console.debug("🌐 userLocale = " + this.$store.state.userLocale + " / i18n.locale = " + this.$i18n.locale);
    if (this.userLocale !== "" && this.userLocale != undefined && this.userLocale != null) {
      console.debug("🌐 using userLocale");
      this.setLocale(this.userLocale);
    } else {
      console.debug("🌐 using browserLocale");
      this.setLocale(this.browserLocale);
    }
  },
  computed: {
    ...mapState({
      userLocale: (state) => state.userLocale,
    }),
  },
};
</script>

<style scoped lang="less">
@import "../style/common.less";

.home-container {
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;

  .navbar-toggler {
    .gradient(@accent-color, @light-color);
    color: white;
  }

  p {
    margin-bottom: 0.5rem;
  }

  .locales {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .locale {
      img {
        width: 3rem;
        height: 3rem;
      }
    }
  }

  .content > * {
    .apply-focus-in(10);
  }
}
</style>
