import moment from 'moment'

export const formatMoment = () => {
  moment.relativeTimeThreshold('d', 30 * 12)
  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ',
      s: '%ds',
      m: '%dm',
      mm: '%dm',
      h: '%dh',
      hh: '%dh',
      d: '%dd',
      dd: '%dd',
      M: 'a mth',
      MM: '%dmths',
      y: 'y',
      yy: '%dy'
    }
  })
}
