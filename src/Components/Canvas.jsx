import React, { useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
//import { Objects } from '../Utils/Objects';
import '../CSS/styles.css';
import '@tensorflow/tfjs';

const Canvas = ({ question }) => {
	useEffect(() => {
		const video = document.getElementById('video');
		const webCamPromise = navigator.mediaDevices
			.getUserMedia({
				audio: false,
				video: {
					facingMode: 'environment',
					width: 350,
					height: 350,
				},
			})
			.then((stream) => {
				video.srcObject = stream;
				return new Promise((resolve, reject) => {
					video.onloadedmetadata = () => {
						video.play();
						resolve();
					};
				});
			});
		const modelPromise = cocoSsd.load();
		Promise.all([modelPromise, webCamPromise]).then((values) => {
			detectFrame(video, values[0]);
		});

		const detectFrame = (video, model) => {
			model.detect(video).then((predictions) => {
				renderPredictions(predictions);
				requestAnimationFrame(() => {
					detectFrame(video, model);
				});
			});
		};

		const renderPredictions = (predictions) => {
			const c = document.getElementById('canvas');
			const ctx = c.getContext('2d');
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			// Font options.
			const font = '16px sans-serif';
			ctx.font = font;
			ctx.textBaseline = 'top';
			predictions.forEach((prediction) => {
				//	console.log(prediction.class);
				const x = prediction.bbox[0];
				const y = prediction.bbox[1];
				const width = prediction.bbox[2];
				const height = prediction.bbox[3];
				// Draw the bounding box.
				//   ctx.strokeStyle='#00FFFF'

				question.answer === prediction.class
					? (ctx.strokeStyle = '#13ed5f')
					: (ctx.strokeStyle = '#ed133f');

				ctx.lineWidth = 4;
				ctx.strokeRect(x, y, width, height);
				// Draw the label background.
				question.answer === prediction.class
					? (ctx.fillStyle = '#13ed5f')
					: (ctx.fillStyle = '#ed133f');
				//ctx.fillStyle = '#00FFFF';
				const textWidth = ctx.measureText(prediction.class).width;
				const textHeight = parseInt(font, 10); // base 10
				ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
			});

			predictions.forEach((prediction) => {
				const x = prediction.bbox[0];
				const y = prediction.bbox[1];
				// Draw the text last to ensure it's on top.
				ctx.fillStyle = '#000000';
				ctx.fillText(prediction.class, x, y);
			});
		};
	}, [question]);

	return (
		<div className="contain">
			<video id="video" width="350" height="350" />
			<canvas id="canvas" width="350" height="350" />
		</div>
	);
};

export default Canvas;
