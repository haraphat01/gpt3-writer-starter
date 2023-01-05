import Head from 'next/head';
import ReactMarkdown from 'react-markdown'


import { useState } from 'react';
import { TfiReload } from 'react-icons/tfi';
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginVertical: 10,
  },
};

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
        <title>Pencil Writer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Pencil Writer</h1>
          </div>
          <div className="header-subtitle">
            <h2>Writer's block is real, but it shouldn't limit you. </h2>
            <h2>Type your topic below, let's pencil write the article for you</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="Type your article's title"
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

        <div className="api-result" style={styles.container}>
          {isGenerating ? (
            <p>Relax while your content is being generated...</p>
          ) : (
            
            <ReactMarkdown style={styles.text}>{apiOutput}</ReactMarkdown>
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
