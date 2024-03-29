import React, { ReactElement, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import "./App.css";

import { Window, WindowHeader, Button, styleReset, Toolbar, WindowContent, TextInput, AppBar,   } from 'react95';
// pick a theme of your choice
import original from 'react95/dist/themes/original';
// original Windows95 font (optionally)
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
`;

export default function App(): ReactElement {

  const [open, setOpen] = useState(false);


  return (
  <div className='background'>
    <GlobalStyles />
    <ThemeProvider theme={original}>
    <Window className='window'>
        <WindowHeader className='window-title'>
          <span>eggs.exe</span>
          <Button>
            <span className='close-icon'>X</span>
            
           
          </Button>
        </WindowHeader>
        
        <WindowContent className='window-content'>
          <p>
            Eggabits are a collection of 2009 64x64px Ordinal inscriptions that have been left on the Bitcoin blockchain by Satoshegg
          </p>
          <p>
            They have no utility. No shitcoin. No Discord. CCO.
          </p>
          <p>
            Just art. Just egg
          </p>
          <p>
           Do you wish to continue?
          </p>
        </WindowContent>
        <div className='window-buttons'>
          <Button style={{width: "100px"}} primary >
            Yes
          </Button>
          <Button style={{width: "100px"}}  primary >
            No
          </Button>
          <Button style={{width: "100px"}}  primary >
            Cancel
          </Button>
        </div>
      </Window>
      {/* <AppBar>
        <Toolbar style={{ justifyContent: 'space-between'}}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Button 
              onClick={() => setOpen(!open)}
              active={open}
              style={{ fontWeight: 'bold' }}
            >
              Start
            </Button>
            
          </div>
          <TextInput placeholder='Search...' width={150} />
        </Toolbar>
      </AppBar> */}
    </ThemeProvider>
  </div>)
}


