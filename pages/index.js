import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';
import { TfiReload } from 'react-icons/tfi';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  let clearParagraph = () => {
    setApiOutput(false);
  };
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    // console.log('Calling OpenAI...');
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    // console.log('OpenAI replied...', output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>AI Writer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>A I Writer</h1>
          </div>
          <div className="header-subtitle">
            <h2>Writer's block is real, but it shouldn't limit you. </h2>
            <h2>Type your topic below, let's the AI do the rest for you</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="start typing here"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="">
            <a className="generate-button" onClick={callGenerateEndpoint}>
              <div className="generate">
                <p>Write</p>
              </div>
            </a>
          </div>
        </div>

        <div className="api-result">
          {isGenerating ? (
            <p>Relax while your content is being generated...</p>
          ) : (
            <p>{apiOutput}</p>
          )}

          {apiOutput && (
            <div className="clear-button">
              <a className="" onClick={clearParagraph}>
                <div className="">
                  <p>Clear</p>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
      {/* <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div> */}
    </div>
  );
};

export default Home;
