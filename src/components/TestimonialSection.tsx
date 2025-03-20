import { useState, useMemo, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const testimonials = [
  {
    id: 1,
    quote: "The platform made finding my dream university program incredibly easy. I'm now studying exactly where I wanted to be!",
    author: "Sarah Johnson",
    role: "International Student",
    image: "data:image/jpeg;base64,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" // Add your image paths
  },
  {
    id: 2,
    quote: "As a university administrator, this platform has transformed how we connect with potential students globally.",
    author: "Dr. Michael Chen",
    role: "University Director",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDw8PDw8PDw4QDw4QDxAQEA8PEBAPFRUWFhUSFxYYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OFxAQGy4dHh0tKy0tNS0rLS0tLS0tLS0vLS0tLSstLSstLS0tKy0tLS0tLSstLS0tLS0tLS0tLSswLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAADAAMBAQEAAAAAAAAAAAAAAQIDBgcFBAj/xABEEAACAQICBwUDCAkCBwEAAAAAAQIDEQQhBQYSMUFRYQcTInGBkaGxFCMyUoLB0fAkQlNicnSSouGysyU0NUNkwvEV/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAEDAgQF/8QAIREBAQEBAQEBAQABBQAAAAAAAAECEQMSIVEEEzJBUmH/2gAMAwEAAhEDEQA/AOqMVimJoKmwx2GkBNh2HYdgJsOw7DsETYCrBYCQsVYAJsFihASeFp/W3BYK8a9Zd7+yp+Op6pZR9WjQ9eu0uW1UwuAezFNwniU/FJrJqnyX73s5nL5TlJ3mr3ebbvd9WTrqR12t2swveng5unf6UqsU/ZFOx9eB7VcLKSVWhVpXazTjOKXF8G7dEcip0VHxZqL4KzufNiKkL+G8embV/uJ1fmP0xo7TGGxF+4r06rVm1CSbSavu3n3n5Zw2LlGcakZuFSLvGpB7Movg7ne9StdqGPjGk33eLjHx03um1vlB8VxtvLK5sbXYLFBYqJsFihWAkVi7CsBNgsUKwENCsZLE2AxtCaMjRLQGOxSCw0FNIB2ADOxFMQCGCGgCwwSHYIQFWCwEhYoAJAdgsBNjx9cNIrDaPxde6i40ZqDf7Sfgh/dJHtWNN7XE/wD8fE2+vhX6d/TA/PtS17LhlvPswiS3uSfSzPZ1L0FDFVJOo8luS+J1nRGq2DppbNCDlzktpv2nn36yXj048uztcep6NxNfw0aE5J8l/ix7ujezPETzryVLovEztmHw8IJKMIRXJJJGHGLPIz16a5+NM4z1xDSWoFWk3syUo8Gt680eFoydXB4ylPOM6NWE0770nn6NXO3aUj4ZPoci1paVW7Vns26t/m5fL1tvKevlJnsfoyErpNbmk15DPI1NqOejcDKV7vC0L3zbtBK/uPYset4kgVYLAKwrFBYCbBYdgAlokuwmgMbE0ZGiWgMdhpDsCQBYCrDAzMRQrAIaQWKQUhodh2CFYLDsMCbCLFYCQKsKwCsa52iUtrROPVr2w85+sGpr4GyGua4SnanBeKjOFeGIpu1p05RS477K+T5nO9fM7XeM/WuRyvUCn3VOpXk7R2s75JJcbm2w16wsfoqrUiuMI3T5s17V/RqeHlQzcJVakbpXvBSfD0R9lTD4qltQpVaOGUbKHeRtdW9OnM8Vsur17s5szJG4aH1vw+JygpxtvUlssz6W1iw+HTdR5c7XNY0TomUpKrKptOLi1JQa2pK11fit5l1z0N8oxEIxkoJU09zd273y9CddfD49I674SomqcK01xtCxoGsk41Uq9N3jtSjmrNXTeaNlr6IrQc4U8RNx/wC3RVGd73/We5+4+HSmiO6pSjNO72JzWV008/cd5+Zr8Z7mrn9ds1fw/dYPCU2rOGGoRfmoRv7z0DVez2vUdCrCrJycZqcbtvZjNfRz8vezaz1519Trxbz865SCw7AdOU2CxVgsBNgsVYVgJaJsW0JgQSzIyWgICxVgsAhgAGcGMLAIYJDQDQDsACGOwWAQigAkBgBLPN05Bd3Gb3Ql4v4ZJx+Nj0yK9JTjKD3STTtv8znWfqWOsa+dSuZaHjGGJr0krKNTagv3ZpNP2tm5x7tQvLZUUrtu2Xqadrdo+WFxdKopp99SlFNR2c4Pc1d/WR5ml9M1o91O3zKhGpf9Vtr6UnwivieG5svK+jnU1Ot8qTjOS2d3hXLfnu8j49PwUasZuSWSWbtuVzQcSq+KcasMZRg0k4/Oyit/7vmefpfB4uvP9JxlFwgkoqE5zT62S/Ny/M/q22X8jquDx9KaVnm4pq+V105mla5VYudt+1sr2tI8PA6RxE33FGfed1stzUZJQtx2mvdxzPUp4T5VpSjhZTaz+clGzcXGLm0r5fqlzm/Uc71Pmug6kUr0qta1lUnGMd30YRSuvVv2GyGDR+ChQpQpU77EFZXzbd7tvq22fSezGfnMj5/pr61aQigOnBAMAqbBYoQEtCaKEwIaJZbRLAkBgAWEMAM4DABFIQ0AwsCGAAAAAhgAhFCAQDADR+1Wg/ktGvHJ0a1r8lNb/bGJquq2mIuKp1FdQ2tnitiW+L5pN+xo6Hrxh1UwFaD3Xpv+9HGfnMDVvJXhtJxlbcuKfoeb1nb/AOvV4Wyd/wCHRcHKlh5bNONOnT322INW8mGltLRcNmNWKbvfYhThvd2s78Ty8LpTC4il85stcb8DDVr4CntOEVe+V/FlZP2XMpq8ermbZeRjhiadClOahGMIrvJqNltz3Rj1beXlfkLslwc62OxGLndqlGe1PNKVaq816R2vajVdYdYO9koQSUdrasuisvZd+0652X4dQ0XQaSUqkq1STtm25tXfpFI28s/va83+R6d/I2sBgeh4wAAAAAAIBhYKliY2DAlkspiYEAMQAAwAzAAAA0IYFAAAMAAAAAAQAACAmtVjCLnOUYQirylJqMYrm28kaVp7tPwGHvGi5YypypNRpJ9arya/hUgj49f9Yaix+D0fTezTa73EtW8d4z7uD6JxUurceROkNFwrUmmk8jl+sGs1XGY14xxjRqfN7EYNtRUElHN73lm+PJHSNU9YaeMhZ2hWil3kL/3x5x+HvPP/AJGL2aenw1OfLn2mdBzoNuk5KD3pM8CcZ8Zz+B2PSmjs3ldM1DSWhLvKObZnn0/rTWP41nRWB25X4b3xOg9k2sNRY6vo+cnKhOMp0It37upTinJR5KS2nbnG/Fng4vDxwVDanbaf0Y/WlyNR0XpqrhsTDFUZJV6cpSi5R2o3aad1xVm0b+XdW1j68kkfqkDlmgO2GnK0cdhnTeSdXDvbh1bpye1FeTkzoeiNPYTFq+FxNKs7XcYy+ciusH4l6o24weiAAQAAAAIYmAMllMTCpJZRLAkAYAADADKAgAYybjQFDJGAxiABgTOSSbbSSTbbdkkt7ZxXXntGq4mU8Pgpyo4VbUZVItxq11uunvjDos3x5Fk6Ok6e12wGDco1aynVW+jRXe1E+TtlH7TRoGme1vESvHCUKdCOdp1X3tTz2cop/wBRzRvP33JlL4nfzEelpfTWKxctrE16tbO6U5eCL/dgvDH0R5k3l52RSZD4erKjHWXFDhpapQlCdGThVTupLfG3Dr5MySjfLofLPD3efHhlvObFje8F2lynsxxGHhs2SlOlOSn/ABbDy9Lnpac1qweHjtqqsRVcVKnTpu6d1eLlLdFe/ocylg47878r5GN4NPO9+L5GN/x82tp7a4zaS01WxMpVK0ryk3spZKMfqxXBGGjCyu9+RccMlm73S81bmZdncuebNpGVqlk/YzJRk1K8W1KLvGSbUovmmtxHH3Dhvfkjpy2/RPaHpPDJL5R38Fls4iPe/wB+U/7jfNXu1fDVXGGMpvCzdl3kW6lFvr+tH2NdTi7ZHHyVl5slkH6toVozjGcJRnCSUozi1KMlzTWTRZ+c9RtcKujsRFtznhJeCtR2m4pN3c4R3Ka39btdV+h8LiIVYQq05KdOpGM4SjmpRaumjizisoguBFIQxMBMljZLAQAADAQAZGxAK4DGmTcaYFpjITHcCrhcQAc67YNZHRpRwNKVp147ddrfGheyj9pp+kXzONt893NcD39fdIvEaTxk98Y1ZUYdI0vB8Yt+p4KaNJPxyUt3vMc3l+fzwL3ZcHu6GNfH/wCFFoS4eTKhuQRQDInTV728S3MsGBjbLdNpJu3iTas08rtcPJkLf7fz7yn0+4DFOG1LPgil9J9Mhx3vqFPdfm2FFgSz9v595QuQQSF9/wANxN836CUv8vkvxCm/cjr3YrrDt06mj6kvFTvVw93vpt+OC8pZ/afI5Da/ly/E+7VzSrwmNw+Ji8qVaDl1p/RqL1i5IlH6hFcSaeazT3PmhXM1USFxMAZLBiYAAguBQEgBkbJuDZIDuNMm4IDJcdzHcdwMiZFetsQnN7oRlN+UVf7gueZrRV2cBjZcsJif9uQH5tq4iU5SnP6U5Sk3zcnd39WD95OafPoC5rdxXI1clN8PY+pijLK/KTMks0Y1x8veiK+iIyKcrpFlQCYyWBMt69Sm8iJ8PMbTW9WT3OzzSdnb1ATlvfR2KiskY3ut1X4mVgBFR5LzQ5MxVZZATKfif2TJFW89/qYaa2pNrha3nbeZZyUer5cSKU78XZfEmUfC3uysrlwpt+KfouCMMpucrL6KFH6i1bxKq4LB1U77eFw8r+cIno3NW7NMRt6IwX7tOdP+ipKP3Gz3M1O4hXC4AJhclsAuO5NxXAyXEK4AUxNgyGwHcpMx3GmBkuBNxgM8TXeVtGY9/wDi1verHtXPE13/AOmY/wDlqvwEH56eeaBx4oEhuTNnLDUXHg9/4mFuzXvPpk7/AHny1Uc1V0nbLqZrnzRkZosSjIJk3E2VBPh5ourWclFN3UVaKySW5cFvyWfQx1H4WNyAS4GVyMKZUpAEpGGpIcpGOViKzYePhy3vMy06aXViprJLoiqjsst/AqMGIk5PYj9p/cVTppF06eyvj1YNAdv7Hal9FRj9TE4iPtal/wCxu9zQOxZ/8Oq/zdX/AEUzfbmddKuIQMgGyWDJbAGxpkgmBYCAC5GOTLkY5MAuNMlDQFXHcQAVc8nW2N9H45c8JiP9DZ6qPk0vS28NiIfXoVo+2EkB+b6e4pox0qmW4qU0lduy6mzhinHij7dD6t4vHO2Hp7UFOMalRuKjTvxed3Zckz4HXg/14+06z2NW+S4pxmtr5Ta3Tu4f5MvXXznsaeee3lahpjs1xuHg50nDFwS8XdJxmvsNu/o79DUM02mmmm008mmuDXA/TNRrO/hfNbmaTrtqzQrqU6kY067i+6xFNWcpJZRqL9ZfnI8+ff8A7PTfDv8AtcdcguS1z3rJ+Y7nrjyG9z8gTyW/gOEbmaFFWs3w4cyo+W+dhVKiR9kaEeRaihw685z6GOTNi0XqriMXGU8O6GzGWy1OcoSTtdZKL5noR7NsbZudXDwau7bU5Xt12UY69My8tazz1Z2Rr1xXVyKs0lnu/ORjjXlf6MVHjtSSkbdZPpZ89WrfKPtLavmn94pIDsHYlU/QsTH6uLb9tOH4HRDm3Yh/yuM/mYf7aOkmddHcTATIExDJYCYJiBMDIIEAFyMcgABIpAAAigAAHa+T3Pf5AAH5nx1Huq1al+zq1If0ycfuPmq3dopJyeeauklxGBq4L5Itz8T4uS+C4Hq6F0hVwd/k89jad3e8r9LPgAC5l/LFmrL+Pura1Y+c1N4uqmouKUdmMLPnBLZfm02YNJ6xYrEQhSrVpTjG7XhhB+rilcAJ8Z/i/ev68mdNPerhGKW6PwADtyXdq99lX58QeW4QEDnMxTm+fsACDcuynF/pdag91Wht+TpySXuqP2Gxaya6UKLlSw67+tGTjUup04U7b82ryfll1EB5/wDSzr0vW/3c4nHMFBZ3zz6ZdEY2tnNZx4riuvUYHpYMUoK914X03PzQ5PmICK7B2Ix/QsTLni37qVP8TogwM66BIAQJiYgATEMAKQAAH//Z"
  },
  {
    id: 3,
    quote: "The support and guidance I received throughout my application process was exceptional.",
    author: "Maria Garcia",
    role: "Graduate Student",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_szPAEWXoreCbz4ydj-0d-vaHH35vcnBpQ&s"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600">
            Real experiences from students and institutions around the world
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 mb-6 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-gray-900 font-semibold">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>
        {`
          .testimonial-swiper .swiper-button-next,
          .testimonial-swiper .swiper-button-prev {
            color: #4B5563;
          }

          .testimonial-swiper .swiper-pagination-bullet {
            background: #4B5563;
          }

          .testimonial-swiper .swiper-pagination-bullet-active {
            background: #2563EB;
          }
        `}
      </style>
    </section>
  );
};

export default TestimonialSection;