import { formatCurrency } from "../utils/functions";

export const defaultOptions = {
  plugins: {
    tooltip: {
      enabled: true,
      position: "nearest",
      padding: 12,
      backgroundColor: 'rgba(47,47,77,0.9)',
      bodyFont: {
        family: "'Comfortaa', 'Roboto', 'Oxygen', sans-serif",
        size: 14
      },
      caretSize: 3,
      boxPadding: 8,

      callbacks: {
        label: function(item){
          return item.label + ' $' + formatCurrency(item.parsed);
        }
      },
    },

    legend: {
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        color: 'rgba(177, 177, 177, 0.9)',
        font: {
          family: "'Comfortaa', 'Roboto', 'Oxygen', sans-serif",
          size: 13,
        },
      },
    }
  },

  cutout: '85%'
};