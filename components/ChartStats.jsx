import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import styles from './ChartStats.module.sass';

const chartStats = (props) => {
  let canvas = useRef(null);

  useEffect(() => {
    let ctx = canvas.current.getContext('2d');

    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: [
          'MON',
          'TUE',
          'WED',
          'THU',
        ],
        datasets: [{
          label: 'Profile views',
          backgroundColor: '#e5f2f7',
          borderColor: '#70b7d4',
          data: [
            20,
            30,
            25,
            35,
          ],
        }],
      },

      // Configuration options go here
      options: {
        scales: {
          xAxes: [{
            color: 'rgba(0, 0, 0, 0)',
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
            color: 'rgba(0, 0, 0, 0)',
            display: false,
            gridLines: {
              display: false,
            },
          }],
        },
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
      },
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoWrapper}>
        <div className={styles.item}>
          <div className={styles.value}>
            {props.views}
          </div>
          <div className={styles.title}>
            Views
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.value}>
            {props.visitors}
          </div>
          <div className={styles.title}>
            Visitors
          </div>
        </div>
      </div>
      <canvas ref={canvas} height="200" />
    </div>
  );
};

chartStats.propTypes = {
  views: PropTypes.string.isRequired,
  visitors: PropTypes.string.isRequired,
};

export default chartStats;
