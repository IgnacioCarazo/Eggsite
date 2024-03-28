import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import {
  Window,
  WindowHeader,
  Button,
  styleReset,
  Toolbar,
  WindowContent,
  TextInput,
  AppBar,
  ProgressBar,
  Frame,
  MenuList,
  MenuListItem,
  Separator,
  NumberInput,
  ScrollView,
} from "react95";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

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
  const [linksWindow, setLinksWindow] = useState(false);
  const [counter, setCounterWindow] = useState(false);
  const [art, setArtWindow] = useState(false);
  const [percent, setPercent] = useState(0);
  const [open, setOpen] = useState(false);
  const [imageCounter, setImageCounter] = useState(1); // Assuming initial counter value is 1

  // Function to handle change in counter value
  const handleImageCounterChange = (number: number) => {
    const newImageCounterValue = number; // Parse counter value to integer
    setImageCounter(newImageCounterValue);
  };

  let time = new Date().toLocaleTimeString();
  const [ctime, setTime] = useState(time);

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((previousPercent) => {
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

  // useEffect(() => {
  //   const audio = new Audio(soundFile); // Create a new Audio object
  //   audio.play(); // Play the audio

  //   const handleAudioEnded = () => {
  //     // When the audio ends, pause it and reset its playback position
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };

  //   // Listen for the 'ended' event on the audio element
  //   audio.addEventListener('ended', handleAudioEnded);

  //   // Clean up function to remove the event listener when the component unmounts
  //   return () => {
  //     audio.removeEventListener('ended', handleAudioEnded);
  //   };
  // }, []);

  return (
    <div className={percent === 100 ? "background" : "loading"}>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        {percent !== 100 && (
          <ProgressBar style={{ width: "80%" }} value={Math.floor(percent)} />
        )}

        {percent === 100 && (
          <div>
            {!linksWindow && (
              <Window className="window">
                <WindowHeader className="window-title">
                  <span>eggs.exe</span>
                  <Button
                    onClick={() => setLinksWindow(!linksWindow)}
                    active={linksWindow}
                  >
                    <span className="close" />
                  </Button>
                </WindowHeader>
                <WindowContent className="window-content">
                  <p>
                    Eggabits are a collection of 2009 64x64px Ordinal
                    inscriptions that have been left on the Bitcoin blockchain
                    by Satoshegg
                  </p>
                  <p>They have no utility. No shitcoin. No Discord. CCO.</p>
                  <p>Just art. Just egg</p>
                  <p>Do you wish to continue?</p>
                </WindowContent>
                <div className="window-buttons">
                  <a href="https://magiceden.io/" target="_self">
                    <Button style={{ width: "100px" }} primary>
                      Yes
                    </Button>
                  </a>
                  <Button style={{ width: "100px" }} primary>
                    <a href="https://google.com">No</a>
                  </Button>
                  <Button
                    onClick={() => setLinksWindow(!linksWindow)}
                    style={{ width: "100px" }}
                    primary
                  >
                    Cancel
                  </Button>
                </div>
              </Window>
            )}
            {!art && (
              <Window className="art-window">
                <WindowHeader className="window-title">
                  <span>art</span>
                  <Button onClick={() => setArtWindow(!art)} active={art}>
                    <span className="close" />
                  </Button>
                </WindowHeader>
                <WindowContent className="window-content">
                  <div className="art-content">
                    <NumberInput
                      onChange={handleImageCounterChange}
                      value={imageCounter}
                      step={1}
                      min={1}
                      max={50}
                      width={130}
                    />
                    <ScrollView id="cutout" className="img-holder">
                      <img
                        className="art-image"
                        src={`/images/${imageCounter}.png`}
                        alt={`Image ${imageCounter}`}
                      />
                    </ScrollView>
                  </div>
                </WindowContent>
              </Window>
            )}

            <AppBar style={{ bottom: 0, top: "auto" }}>
              <Toolbar style={{ justifyContent: "space-between" }}>
                <Button
                  onClick={() => setOpen(!open)}
                  style={{ fontWeight: "bold" }}
                >
                  <img
                    src="/startIcon.png"
                    alt="StartIcon"
                    style={{ height: "32px", width: "32px" }}
                  />
                  Start
                </Button>
                {open && (
                  <MenuList
                    style={{
                      position: "absolute",
                      width: "200px",
                      left: "0",
                      bottom: "100%",
                    }}
                    onClick={() => setOpen(false)}
                  >
                    <MenuListItem onClick={() => setLinksWindow(!linksWindow)}>
                      <div className="start-item">
                        <img
                          src="/icon_egg5.png"
                          alt="Yolk"
                          style={{
                            height: "24px",
                            width: "20px",
                            marginBottom: "10px",
                          }}
                        />
                        About
                      </div>
                    </MenuListItem>
                    <MenuListItem onClick={() => setArtWindow(!art)}>
                      <div className="start-item">
                        <img
                          src="/icon_egg5.png"
                          alt="Baller"
                          style={{
                            height: "24px",
                            width: "20px",
                            marginBottom: "10px",
                          }}
                        />
                        Art
                      </div>
                    </MenuListItem>
                    <Separator />
                    <MenuListItem disabled>
                      <div className="start-item">
                        <img
                          src="/icon_egg5.png"
                          alt="Dragon"
                          style={{
                            height: "24px",
                            width: "20px",
                            marginBottom: "10px",
                          }}
                        />
                        Shut Down
                      </div>
                    </MenuListItem>
                  </MenuList>
                )}
                <Frame
                  variant="well"
                  className="clock"
                  style={{ display: "flex", height: "36px" }}
                >
                  {ctime}
                </Frame>
              </Toolbar>
            </AppBar>
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}
