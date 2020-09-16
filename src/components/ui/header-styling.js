import { makeStyles } from '@material-ui/styles';
export default makeStyles((theme) => ({
  appBar: { zIndex: theme.zIndex.modal + 1 },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1rem',
    '@media (max-width:960px)': {
      marginBottom: '0.5rem',
    },
    '@media (max-width:600px)': {
      marginBottom: '1rem',
    },
  },
  logo: {
    height: '5rem',
    '@media (max-width:960px)': {
      height: '4.5rem',
      transform: 'translateX(8vw)',
    },
    '@media (max-width:600px)': {
      transform: 'translateX(10vw)',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': { background: 'transparent' },
    '@media (max-width:960px)': {
      marginLeft: 'auto',
    },
    '@media (max-width:600px)': {
      marginLeft: 'auto',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    marginLeft: '10px',
    minWidth: '10px',
  },
  estimateButton: {
    ...theme.button,
    ...theme.button.estimate,
    borderRadius: '50px',
    margin: '0 15px',
    padding: '0.5rem 0.5rem',
    fontSize: '0.8rem',
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: '0.7',
    '&:hover': {
      opacity: 1,
    },
    '&.selected': {
      backgroundColor: theme.palette.secondary.main,
      opacity: 1,
    },
  },
  selected: {
    backgroundColor: 'red',
  },
  sideDrawerContainer: {
    transform: 'translateX(-80vw)',
    '@media (max-width:960px)': {
      transform: 'translateX(-90vw)',
    },
    '@media (max-width:600px)': {
      transform: 'translate(-80vw)',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  sideDrawerIcon: {
    width: '3rem',
    height: '3rem',
    color: 'white',
  },
  sideDrawerWindow: {
    backgroundColor: theme.palette.common.blue,
  },
  sideDrawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: '0.7',
    '&:hover': {
      color: 'black',
    },
  },
  sideDrawerItemSelected: {
    opacity: 1,
  },
  sideDrawerEstimate: {
    ...theme.typography.tab,
    ...theme.button.estimate,
    backgroundColor: theme.palette.secondary.main,
    '&_item': {
      ...theme.button.estimate,
    },
  },
}));

// export default useStyles;
