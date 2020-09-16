import React, { useState, useEffect } from 'react';
import {
  Button,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  useScrollTrigger,
  Menu,
  MenuItem,
  useMediaQuery,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import headerStyle from './header-styling';
import { useTheme } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

// This is used for elevate the header section
function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Header() {
  // import the css styles
  const classes = headerStyle();
  // value will be used by tabs to determine the current tab
  const [value, setValue] = useState(0);
  // anchor Ele tells the menu where to show itself on the screen and to
  // which component to latch on to the DOM
  const [anchorEle, setAnchorEle] = useState(null);
  // open will be used by menu to determine whether to open or close menu
  const [open, setOpen] = useState(false);
  // selectedMenuIndex will determine which option in the menu item is cuurently selected
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(1);
  // sideDrawerOpen will monitor the opening and closing operations of the drawer
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  // creating an instance of useTheme
  const theme = useTheme();
  // This variable will be either true or false based on the size of window
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  // This is for smoothing the animation for ios
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // An array which would display the menu item name and its link
  const menuOptions = [
    { name: 'Services', link: 'services', activeNavIndex: 1, selectedIndex: 0 },
    { name: 'Mobile Development', link: 'mobile', activeNavIndex: 1, selectedIndex: 1 },
    { name: 'Web Development', link: 'web-development', activeNavIndex: 1, selectedIndex: 2 },
    {
      name: 'Custom Software Development',
      link: 'custom-software',
      activeNavIndex: 1,
      selectedIndex: 3,
    },
  ];
  //This array object will be used to display navigation items on the SideDrawer and AppBar
  const navigationTabOptions = [
    { name: 'Home', link: '', activeNavIndex: 0 },
    {
      name: 'Services',
      link: 'services',
      activeNavIndex: 1,
      ariaOwns: anchorEle ? 'simple-menu' : null,
      ariaPopup: anchorEle ? true : false,
      mouseOver: (event) => handleMenuOpen(event),
    },
    { name: 'The Revolution', link: 'the-revolution', activeNavIndex: 2 },
    { name: 'About Us', link: 'about-us', activeNavIndex: 3 },
    { name: 'Contact Us', link: 'contact-us', activeNavIndex: 4 },
  ];

  // To set the value of the active Tab for the current active tab property
  const handleTabChange = (event, value) => {
    setValue(value);
  };

  // On Mouse Hover the menu to be displayed
  const handleMenuOpen = (event) => {
    setAnchorEle(event.currentTarget);
    setOpen(true);
  };

  // On Mouse leave the menu item to be closed
  const handleMenuClose = () => {
    setAnchorEle(null);
    setOpen(false);
  };

  // This would record if any of the Menu Item is selected.
  const handleMenuItemActive = (event, index) => {
    setAnchorEle(null);
    setOpen(false);
    setSelectedMenuIndex(index);
    console.log('handleMenuItemActive -> SelectedMenuIndex = ', selectedMenuIndex);
  };

  // The useEffect will look into the pathname of the url and based on that,
  // the activeIndex and selectedMenuIndex will be set
  useEffect(() => {
    [...menuOptions, ...navigationTabOptions].forEach((option) => {
      switch (window.location.pathname) {
        case `/${option.link}`:
          if (value !== option.activeNavIndex) {
            setValue(option.activeNavIndex);
            console.log('useEffect -> value = ', value);
            if (option.selectedIndex && option.selectedIndex !== selectedMenuIndex) {
              setSelectedMenuIndex(option.selectedIndex);
            }
            console.log('useEffect -> SelectedMenuIndex = ', selectedMenuIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [value, selectedMenuIndex, menuOptions, navigationTabOptions]);

  // This tab will load the Tab container
  const tabs = (
    <React.Fragment>
      <Tabs className={classes.tabContainer} value={value} onChange={handleTabChange}>
        {/* Based on the options in the navigation the tabs will be rendered */}
        {navigationTabOptions.map((option) => (
          <Tab
            key={option.name}
            className={classes.tab}
            component={Link}
            to={`/${option.link}`}
            label={option.name}
            aria-owns={option.ariaOwns}
            aria-haspopup={option.ariaPopup}
            onMouseOver={option.mouseOver}
          />
        ))}
      </Tabs>
      <Button
        variant='contained'
        color='secondary'
        className={classes.estimateButton}
        component={Link}
        to='/estimate'>
        Free Estimate
      </Button>
      <Menu
        id='simple-menu'
        keepMounted
        // This prop will help adding custom object as props to our menu
        MenuListProps={{ onMouseLeave: handleMenuClose }}
        open={open}
        anchorEl={anchorEle}
        classes={{ paper: classes.menu }}
        elevation={0}
        style={{ zIndex: 1302 }}>
        {/* Based on the options in the menu the options will be rendered */}
        {menuOptions.map((option) => (
          <MenuItem
            onClick={(event) => {
              handleMenuClose();
              setValue(option.activeNavIndex);
              handleMenuItemActive(event, option.selectedIndex);
            }}
            key={option.name}
            component={Link}
            to={`/${option.link}`}
            selected={option.selectedIndex === selectedMenuIndex && value === 1}
            classes={{ root: classes.menuItem, selected: 'selected' }}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  // This const will load the swipeable Drawer which looks cool on mobile.
  const swipeableDrawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={sideDrawerOpen}
        onOpen={() => setSideDrawerOpen(true)}
        onClose={() => setSideDrawerOpen(false)}
        classes={{ paper: classes.sideDrawerWindow }}>
        {/* This div is for moving the content below the AppBar */}
        <div className={classes.toolbarMargin} />
        {/* Load the list */}
        <List onClick={() => setSideDrawerOpen(false)}>
          {/* Based on the options of navigation the tabs will be rendered */}
          {navigationTabOptions.map((option, index) => (
            <ListItem
              key={option.name}
              onClick={() => setValue(index)}
              divider
              button
              component={Link}
              to={`/${option.link}`}
              selected={value === option.activeNavIndex}>
              <ListItemText
                className={
                  value === option.activeNavIndex
                    ? [classes.sideDrawerItem, classes.sideDrawerItemSelected].join(' ')
                    : classes.sideDrawerItem
                }>
                {option.name}
              </ListItemText>
            </ListItem>
          ))}
          {/* This option will contain the Estimate rendering */}
          <ListItem
            divider
            button
            className={classes.sideDrawerEstimate}
            component={Link}
            to='/estimate'>
            <ListItemText disableTypography className={classes.sideDrawerEstimate_item}>
              Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      {/* This section is for loadin an Hamburger Icon on a button container */}
      <IconButton
        onClick={() => setSideDrawerOpen(!sideDrawerOpen)}
        disableRipple
        className={classes.sideDrawerContainer}>
        {/* Render the Hamburger Icon*/}
        <MenuIcon className={classes.sideDrawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        {/* AppBar is a container where Tabs and Logo can be placed */}
        <AppBar position='fixed' className={classes.appBar}>
          {/* ToolBar places the items horizontally */}
          <Toolbar disableGutters>
            {/* Container for Logo */}
            <Button
              component={Link}
              to='/'
              disableRipple
              className={classes.logoContainer}
              onClick={() => setValue(0)}>
              {/* Logo Image */}
              <img src={logo} alt='Company Logo' className={classes.logo} />
            </Button>
            {/* Tabs is the container for the image */}
            {matches ? swipeableDrawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* This div is for moving the content below the AppBar */}
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
