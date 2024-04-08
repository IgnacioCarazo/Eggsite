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
import art_icon from "../src/assets/images/about-icon.png";
import about_icon from "../src/assets/images/art-icon.png";
import shutdown_icon from "../src/assets/images/shutdown-icon.png";
import start_icon from "../src/assets/images/start-icon.png";
import startSound from "../src/assets/audio/start.mp3";

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

const importedImages: string[] = [];

// Loop through image numbers from 1 to 50
for (let i = 1; i <= 50; i++) {
  // Import each image dynamically and push it into the array
  importedImages.push(require(`../src/assets/art-display-images/${i}.png`));
}

export default function App(): ReactElement {
  const [currentWindow, setCurrentWindow] = useState(1);
  const [aboutWindow, setAboutWindow] = useState(true);
  const [art, setArtWindow] = useState(false);
  const [start, setStart] = useState(
    sessionStorage.getItem("start") === "true" ? true : false
  );
  const [percent, setPercent] = useState(
    Number(sessionStorage.getItem("percent")) || 0
  );
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
    if (start && percent === 0) {
      const timer = setInterval(() => {
        setPercent((previousPercent) => {
          if (previousPercent === 100) {
            clearInterval(timer); // Stop the timer when percent reaches 100
          }
          const diff = Math.random() * 10;
          return Math.min(previousPercent + diff, 100);
        });
      }, 400);

      // Play audio only once when start becomes true
      const audio = new Audio(startSound);
      audio.volume = 0.5;
      audio.play();

      const handleAudioEnded = () => {
        // When the audio ends, pause it and reset its playback position
        audio.pause();
        audio.currentTime = 0;
      };

      // Listen for the 'ended' event on the audio element
      audio.addEventListener("ended", handleAudioEnded);

      // Save start and percent states to sessionStorage
      sessionStorage.setItem("start", String(start));
      sessionStorage.setItem("percent", String(100));

      // Clean up function to remove the event listener when the component unmounts
      return () => {
        console.log(123);
        audio.removeEventListener("ended", handleAudioEnded);
      };
    }
  }, [start, percent, startSound]);
  return (
    <div className={percent === 100 ? "background" : "loading"}>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        {!start && <Button onClick={() => setStart(true)}>Start</Button>}
        {start && percent !== 100 && (
          <ProgressBar style={{ width: "60%" }} value={Math.floor(percent)} />
        )}

        {percent === 100 && (
          <div>
            {aboutWindow && currentWindow === 1 && (
              <Window className="window">
                <WindowHeader className="window-title">
                  <span>eggs.exe</span>
                  <Button onClick={() => setAboutWindow(!aboutWindow)}>
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
                    onClick={() => setAboutWindow(!aboutWindow)}
                    style={{ width: "100px" }}
                    primary
                  >
                    Cancel
                  </Button>
                </div>
              </Window>
            )}
            {art && currentWindow === 2 && (
              <Window className="art-window">
                <WindowHeader className="window-title">
                  <span>art</span>
                  <Button
                    onClick={() => {
                      setArtWindow(!art);
                      setImageCounter(1);
                    }}
                  >
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
                        src={importedImages[imageCounter - 1]}
                        alt={`Egg ${imageCounter}`}
                      />
                    </ScrollView>
                  </div>
                </WindowContent>
              </Window>
            )}

            <AppBar style={{ bottom: 0, top: "auto" }}>
              <Toolbar style={{ justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "5px" }}>
                  <Button
                    onClick={() => setOpen(!open)}
                    style={
                      window.innerWidth >= 600
                        ? {
                            fontWeight: "bold",
                          }
                        : {
                            width: "70px",
                            fontWeight: "bold",
                          }
                    }
                  >
                    {window.innerWidth >= 600 ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={start_icon}
                          alt="StartIcon"
                          style={{ height: "32px", width: "32px" }}
                        />
                        Start
                      </div>
                    ) : (
                      <div>Start</div>
                    )}
                  </Button>
                  {art && (
                    <Button
                      onClick={() => {
                        setCurrentWindow(2);
                      }}
                      active={currentWindow == 2 ? true : false}
                      style={
                        window.innerWidth >= 600
                          ? {
                              display: "flex",
                              justifyContent: "flex-start",
                              gap: "20px",
                              width: "200px",
                            }
                          : {
                              display: "flex",
                              justifyContent: "flex-start",
                              gap: "2px",
                              width: "60px",
                            }
                      }
                    >
                      <img
                        src={art_icon}
                        alt="ArtIcon"
                        style={
                          window.innerWidth >= 600
                            ? {
                                height: "24px",
                                width: "20px",
                                display: "flex",
                              }
                            : {
                                height: "20px",
                                width: "16px",
                                display: "flex",
                              }
                        }
                      />
                      Art
                    </Button>
                  )}
                  {aboutWindow && (
                    <Button
                      onClick={() => {
                        setCurrentWindow(1);
                      }}
                      active={currentWindow == 1 ? true : false}
                      style={
                        window.innerWidth >= 600
                          ? {
                              display: "flex",
                              justifyContent: "flex-start",
                              gap: "20px",
                              width: "200px",
                            }
                          : {
                              display: "flex",
                              justifyContent: "flex-start",
                              gap: "2px",
                              width: "80px",
                            }
                      }
                    >
                      <img
                        src={about_icon}
                        alt="StartIcon"
                        style={
                          window.innerWidth >= 600
                            ? {
                                height: "24px",
                                width: "20px",
                                display: "flex",
                              }
                            : {
                                height: "20px",
                                width: "16px",
                                display: "flex",
                              }
                        }
                      />
                      About
                    </Button>
                  )}
                </div>
                {open && (
                  <MenuList
                    style={
                      window.innerWidth >= 600
                        ? {
                            position: "absolute",
                            width: "200px",
                            left: "0",
                            bottom: "100%",
                          }
                        : {
                            position: "absolute",
                            width: "120px",
                            left: "0",
                            bottom: "100%",
                          }
                    }
                    onClick={() => setOpen(false)}
                  >
                    <MenuListItem
                      onClick={() => {
                        setAboutWindow(true);
                        setCurrentWindow(1);
                      }}
                    >
                      <div className="start-item">
                        <img
                          src={about_icon}
                          alt="About Icon"
                          style={{
                            height: "24px",
                            width: "20px",
                            marginBottom: "10px",
                          }}
                        />
                        About
                      </div>
                    </MenuListItem>
                    <MenuListItem
                      onClick={() => {
                        setArtWindow(true);
                        setCurrentWindow(2);
                      }}
                    >
                      <div className="start-item">
                        <img
                          src={art_icon}
                          alt="Art"
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
                          src={shutdown_icon}
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
                  style={
                    window.innerWidth >= 600
                      ? { display: "flex", height: "36px" }
                      : { display: "flex", height: "36px", width: "80px" }
                  }
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
