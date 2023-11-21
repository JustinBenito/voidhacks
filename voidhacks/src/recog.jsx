import React, { useEffect, useRef, useState } from 'react';

const TeachableMachineComponent = () => {
  const webcamContainerRef = useRef(null);
  const labelContainerRef = useRef(null);
  const webcamRef = useRef(null);
  const [currentPrediction, setCurrentPrediction] = useState('');

  const URL = "https://teachablemachine.withgoogle.com/models/HyxCV8P4C/";
  let model, maxPredictions;

  useEffect(() => {
    const init = async () => {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      const flip = true;
      webcamRef.current = new tmImage.Webcam(200, 200, flip);
      await webcamRef.current.setup();
      await webcamRef.current.play();
      window.requestAnimationFrame(loop);

      webcamContainerRef.current.appendChild(webcamRef.current.canvas);
      labelContainerRef.current.innerHTML = '';
      for (let i = 0; i < maxPredictions; i++) {
        labelContainerRef.current.appendChild(document.createElement("div"));
      }
    };

    const loop = async () => {
      webcamRef.current.update();
      await predict();
      window.requestAnimationFrame(loop);
    };

    const predict = async () => {
      const predictions = await model.predict(webcamRef.current.canvas);

      // Find the prediction with the highest probability
      const maxPrediction = predictions.reduce((max, prediction) =>
        prediction.probability > max.probability ? prediction : max
      );

      const classPrediction = `${maxPrediction.className}: ${maxPrediction.probability.toFixed(2)}`;
      setCurrentPrediction(classPrediction);
    };

    init();

    return () => {
      // Cleanup code if needed
      // E.g., webcamRef.current.stop();
    };
  }, []); // empty dependency array to run the effect only once when the component mounts

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">New Indian Voting System</h1>

      <div className="relative bg-gray-300 w-full sm:w-96 h-96 sm:h-72 mb-4">
        {/* Your webcam container component */}
        <div ref={webcamContainerRef} className="absolute inset-0"></div>
      </div>

      <div className="bg-gray-300 w-full sm:w-96 h-48 mb-8">
        {/* Display the class with the highest probability */}
        <div className="h-full">{currentPrediction}</div>
      </div>

      <button
        type="button"
        onClick={() => {}}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Start
      </button>
    </div>
  );
};

export default TeachableMachineComponent;