import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TimelineMax, Power3 } from 'gsap';
import styles from './FormAddDetail.module.sass';

const formAddDetail = (props) => {
  let showFormTl = new TimelineMax({ paused: true });
  let hideDescription = new TimelineMax({ paused: true });
  let formWrapperRef = useRef(null);
  let openButtonRef = useRef(null);
  let descriptionRef = useRef(null);
  let formContentWrapperRef = useRef(null);

  useEffect(() => {
    hideDescription
      .to(descriptionRef, 0.3, { css: { opacity: 0 }, ease: Power3.easeOut })
      .to(descriptionRef, 0.1, { css: { display: 'none' }, ease: Power3.easeOut });

    showFormTl
      .to(formWrapperRef, 0.5, {
        css: {
          width: '100%',
          height: 370,
          borderRadius: 0,
        },
        ease: Power3.easeOut,
      })
      .to(openButtonRef, 0.3, {
        css: {
          opacity: 0,
          display: 'none',
        },
        ease: Power3.easeOut,
      }, '-=.4')
      .to(formContentWrapperRef, 0.3, {
        css: {
          opacity: 1,
          display: 'block',
        },
        ease: Power3.easeOut,
      });
  });

  const toggleForm = (action) => {
    if (action === 'open') {
      hideDescription.play();

      setTimeout(() => {
        showFormTl.play();
      }, hideDescription.duration() * 1000);
    } else if (action === 'close') {
      showFormTl.reverse();

      setTimeout(() => {
        hideDescription.reverse();
      }, showFormTl.duration() * 1000);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className="p-4">
        <div className="w-100 d-flex align-items-sm-center">
          <div
            className={`${styles.formWrapper} bg-${props.color}`}
            ref={(ref) => { formWrapperRef = ref; }}
          >
            <button
              className={styles.openButton}
              type="button"
              onClick={() => { toggleForm('open'); }}
              ref={(ref) => { openButtonRef = ref; }}
            >
              <span className={`${styles.icon} lnr lnr-heart`} />
            </button>
            <section
              className={styles.formContentWrapper}
              ref={(ref) => { formContentWrapperRef = ref; }}
            >
              <header>
                <h6>{props.title}</h6>
                <button
                  className={styles.closeButton}
                  type="button"
                  onClick={() => { toggleForm('close'); }}
                >
                  X
                </button>
              </header>
              <div className={styles.form}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <input type="text" placeholder="Organisation" />
                  </div>
                  <div className="col-6 mb-5">
                    <input type="text" placeholder="Cause" />
                  </div>
                  <div className="col-6 mb-5">
                    <input type="text" placeholder="Date" />
                  </div>
                  <div className="col-12 text-center">
                    <button
                      className={`${styles.saveButton} color-${props.color}`}
                      type="button"
                      onClick={() => { toggleForm('close'); }}
                    >
                      {props.button}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div
            className={styles.description}
            ref={(ref) => { descriptionRef = ref; }}
          >
            <h4 className="h6">
              {props.title}
            </h4>
            <p className="m-0">
              {props.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

formAddDetail.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  color: PropTypes.string,
  button: PropTypes.string,
};

formAddDetail.defaultProps = {
  color: 'green',
  button: 'Save',
};

export default formAddDetail;
