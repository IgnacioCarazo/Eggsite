import React, { ReactElement, useEffect, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';


import { Window, WindowHeader, Button, styleReset, Toolbar, WindowContent, TextInput, AppBar, ProgressBar, Frame,   } from 'react95';
import original from 'react95/dist/themes/original';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

import "./App.css";

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
  const [closed, setClosed] = useState(false);
  const [percent, setPercent] = useState(0);

  let time  = new Date().toLocaleTimeString()

  const [ctime,setTime] = useState(time)
  const UpdateTime=()=>{
    time =  new Date().toLocaleTimeString()
    setTime(time)
  }
  setInterval(UpdateTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent(previousPercent => {
        if (previousPercent === 100) {
          
        }
        const diff = Math.random() * 10;
        return Math.min(previousPercent + diff, 100);
      });
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
  <div className={percent === 100 ? 'background' : 'loading'}>
    <GlobalStyles />
    <ThemeProvider theme={original}>
    
    {percent !== 100 &&  <ProgressBar value={Math.floor(percent)} />}

    {percent === 100 &&
      <div>
        {!closed && <Window className='window'>
            <WindowHeader className='window-title'>
              <span>eggs.exe</span>
              <Button
              onClick={() => setClosed(!closed)}
              active={closed}
              >
                <span className='close'/>
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
              <a href="https://magiceden.io/" target="_self">
              <Button style={{width: "100px"}} primary >
                Yes
              </Button>
              </a>
              <Button style={{width: "100px"}}  primary >
                <a href="https://google.com">No</a>
              </Button>
              <Button 
                onClick={() => setClosed(!closed)}
                style={{width: "100px"}}  
                primary >
                Cancel
              </Button>
            </div>
          </Window>}
          <AppBar style={{bottom: 0, top: "auto"}}>
            <Toolbar style={{ justifyContent: 'space-between'}}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Button 
                  onClick={() => setClosed(false)}
                  style={{ fontWeight: 'bold' }}
                >
                  Start
                </Button>
              </div>
              <Frame
                variant='well'
                className='clock'
                style={{display: "flex"}}
              >
                {ctime}
              </Frame>
            </Toolbar>
          </AppBar>
        </div>}
    </ThemeProvider>
  </div>)
}


