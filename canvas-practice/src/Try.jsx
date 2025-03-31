import React, { useEffect } from 'react';
import { Canvas, Line } from 'fabric';

const Try = () => {
  useEffect(() => {
    const canvas = new Canvas('c', { selection: false });
    let line = null;
    let isDrawing = false;

    canvas.on('mouse:down', (o) => {
      isDrawing = true;
      const pointer = canvas.getPointer(o.e);
      const points = [pointer.x, pointer.y, pointer.x, pointer.y];

      line = new Line(points, {
        strokeWidth: 3,
        stroke: 'black',
      });
      canvas.add(line);
    });

    canvas.on('mouse:move', (o) => {
      if (!isDrawing) return;
      const pointer = canvas.getPointer(o.e);
      line.set({ x2: pointer.x, y2: pointer.y });
      canvas.renderAll();
    });

    canvas.on('mouse:up', () => {
      isDrawing = false;
    });
  }, []);

  return <canvas id="c" width="800" height="600" style={{ border: '1px solid black' }}></canvas>;
};

export default Try;
