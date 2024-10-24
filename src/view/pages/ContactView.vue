<template>
  <div class="container">
    <div class="row justify-content-center py-3">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="wave-card shadow">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>

          <div class="main-contnet p-4">
            <div class="p-4 pb-2">
              <img src="../../assets/img/contact/foto_profilo_no_bg.png" class="img-fluid rounded object-fit-cover"
                alt="foto profilo personale">
            </div>
            <h3>{{ name }}</h3>

            <div class="stl_card mx-auto shadow">
              <button type="button" @mouseover="handleActive('EMAIL', email, 'mailto:' + email)"
                class="socialContainer containerOne">
                <img src="../../assets/img/contact/mail.svg" alt="Email">
              </button>

              <button type="button" @mouseover="handleActive('PORTFOLIO', '/portfolio-antocic', site_link)"
                class="socialContainer containerTwo">
                <span class="material-symbols-outlined text-light">
                  language
                </span>
              </button>

              <button type="button" @mouseover="handleActive('LINKEDIN', '/Antonino-Cicala', linkedin_link)"
                class="socialContainer containerThree">
                <img src="../../assets/img/contact/linkedin.svg" alt="Linkedin">
              </button>

              <button type="button" @mouseover="handleActive('GITHUB', '/AntoCic', git_link)"
                class="socialContainer containerFour">
                <img class="ico-big" src="../../assets/img/contact/github.svg" alt="Github">
              </button>
            </div>

            <div class="contact-info overflow-hidden">
              <div v-if="infoContent" class="box rounded mt-1 shadow">
                <p class="mb-0 py-2">

                  <span class="text-info-box">
                    {{ infoContent.contentTipe }}
                  </span>

                  <br>

                  <a :href="infoContent.href">
                    {{ infoContent.content }}
                  </a>

                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      name: 'Antonino Cicala',
      email: 'anto.cic.127@gmail.com',
      phone: '+39 3295436315',
      linkedin_link: 'https://www.linkedin.com/in/antonino-cicala/',
      git_link: 'https://github.com/AntoCic',
      site_link: 'https://portfolio-antocic.netlify.app',
      infoContent: null
    }
  },
  methods: {
    handleActive(contentTipe, content, href) {
      this.infoContent = { contentTipe, href, content }
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

</script>

<style lang="scss" scoped>
@use '../../assets/scss/partials/_variables.scss' as *;

.wave-card {
  margin: 0 auto;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;

  .wave {
    position: absolute;
    width: 400px;
    height: 550px;
    opacity: 0.6;
    left: 0;
    top: 0;
    margin-left: -50%;
    margin-top: -70%;
    background: linear-gradient(744deg, #a942f3, #543cf5 60%, #13c4d1);
  }

  .wave:nth-child(2),
  .wave:nth-child(3) {
    top: 210px;
  }

  @media (min-width: 576px) {
    .wave {
      width: 500px;
      height: 700px;
    }

    .wave:nth-child(2),
    .wave:nth-child(3) {
      top: 110px;
    }
  }

  .wave {
    border-radius: 40%;
    animation: wave-rot 55s infinite linear;
  }

  .wave:nth-child(2) {
    animation-duration: 50s;
  }

  .wave:nth-child(3) {
    animation-duration: 45s;
  }

  @keyframes wave-rot {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .main-contnet {
    text-align: center;
    font-size: 20px;
    position: relative;
    color: $text-color;
    font-weight: 600;
  }

}

.stl_card {
  width: fit-content;
  height: fit-content;
  background-color: rgba(238, 238, 238, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 25px;
  gap: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.055);
  border-radius: 0.375rem;

  .socialContainer {
    width: 52px;
    height: 52px;
    background-color: #1D3950;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition-duration: 0.3s;
    border: 0;
    border-radius: 0.375rem;


    &:hover img {
      animation: slide-in-top 0.3s both;
    }

    @keyframes slide-in-top {
      0% {
        transform: translateY(50px);
        opacity: 0;
      }

      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }


  }

  /* mail*/
  .containerOne {
    &:hover {
      background: rgb(66, 133, 244);
      background: linear-gradient(120deg, rgba(66, 133, 244, 1) 20%, rgba(197, 34, 31, 1) 20%, rgba(197, 34, 31, 1) 40%, rgba(234, 67, 53, 1) 40%, rgba(234, 67, 53, 1) 60%, rgba(52, 168, 83, 1) 60%, rgba(52, 168, 83, 1) 80%, rgba(251, 188, 4, 1) 80%);
      transition-duration: 0.3s;
      transform: scale(1.5);
      border-radius: 15px;
    }

    img {
      width: 24px;
    }
  }

  /* site*/
  .containerTwo {
    &:hover {
      background-color: #673EDB;
      transition-duration: 0.3s;
      transform: scale(1.5);
      border-radius: 15px;
    }

    img {
      width: 24px;
    }
  }

  /* linkdin*/
  .containerThree {
    &:hover {
      background-color: #0A66C2;
      transition-duration: 0.3s;
      transform: scale(1.5);
      border-radius: 15px;
    }

    img {
      width: 22px;
    }
  }

  /* github*/
  .containerFour {
    &:hover {
      background-color: #0D1117;
      transition-duration: 0.3s;
      transform: scale(1.5);
      border-radius: 15px;
    }

    img {
      width: 27px;
    }
  }

  .socialContainer:active {
    transform: scale(0.9);
    transition-duration: 0.3s;
  }

}

.contact-info {
  max-width: 250px;
  min-height: 78px;
  margin: 0 auto;

  .box {
    position: relative;
    background-color: #8597A5;
    animation: slide-box 0.5s both;

    .text-info-box {
      color: $bg-color;
    }
  }

  @keyframes slide-box {
    0% {
      transform: translateY(-80px);
      opacity: 0;
    }

    80% {
      opacity: 1;
    }

    100% {
      transform: translateY(0);
    }
  }

}
</style>