const ctx = document.getElementById('runsHistogram').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['0–10', '11–20', '21–30', '31–40', '41–50', '51–60', '61–70'],
        datasets: [{
            label: 'Number of Matches',
            data: [4, 6, 8, 5, 7, 3, 2],
            backgroundColor: '#38bdf8',
            borderColor: '#0ea5e9',
            borderWidth: 1,
            borderRadius: 6,
            barThickness: 45
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                },
                title: {
                    display: true,
                    text: 'Number of Matches'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Runs Scored (Class Intervals)'
                }
            }
        }
    }
});
const xyctx = document.getElementById('coordinatePlane').getContext('2d');

function drawCoordinatePlane(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const step = 50; // distance between ticks
    const arrowSize = 8;

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#1e293b';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // === X-Axis Line ===
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // === Y-Axis Line ===
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // === X-Axis Arrows ===
    drawArrowhead(ctx, width - 10, centerY, 1, 0);   // X
    drawArrowhead(ctx, 10, centerY, -1, 0);          // X'
    ctx.fillText("X", width - 15, centerY - 10);
    ctx.fillText("X'", 15, centerY - 10);

    // === Y-Axis Arrows ===
    drawArrowhead(ctx, centerX, 10, 0, -1);          // Y
    drawArrowhead(ctx, centerX, height - 10, 0, 1);  // Y'
    ctx.fillText("Y", centerX + 15, 15);
    ctx.fillText("Y'", centerX + 15, height - 15);

    // === Tick marks and values on X-Axis ===
    for (let x = centerX + step, val = 1; x < width - 20; x += step, val++) {
        drawTick(ctx, x, centerY, 'x', val);
    }
    for (let x = centerX - step, val = -1; x > 20; x -= step, val--) {
        drawTick(ctx, x, centerY, 'x', val);
    }

    // === Tick marks and values on Y-Axis ===
    for (let y = centerY - step, val = 1; y > 20; y -= step, val++) {
        drawTick(ctx, centerX, y, 'y', val);
    }
    for (let y = centerY + step, val = -1; y < height - 20; y += step, val--) {
        drawTick(ctx, centerX, y, 'y', val);
    }

    // Draw origin label
    ctx.fillText("O", centerX - 12, centerY + 15);
}

function drawArrowhead(ctx, x, y, dx, dy) {
    const size = 8;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - dx * size - dy * size / 2, y - dy * size + dx * size / 2);
    ctx.lineTo(x - dx * size + dy * size / 2, y - dy * size - dx * size / 2);
    ctx.closePath();
    ctx.fill();
}

function drawTick(ctx, x, y, axis, label) {
    const tickSize = 5;
    if (axis === 'x') {
        ctx.beginPath();
        ctx.moveTo(x, y - tickSize);
        ctx.lineTo(x, y + tickSize);
        ctx.stroke();
        ctx.fillText(label.toString(), x, y + 15);
    } else {
        ctx.beginPath();
        ctx.moveTo(x - tickSize, y);
        ctx.lineTo(x + tickSize, y);
        ctx.stroke();
        ctx.fillText(label.toString(), x - 15, y);
    }
}

// Call it
drawCoordinatePlane(xyctx, 500, 500);
const pointctx = document.getElementById('pointPlane').getContext('2d');

function plotPoints(ctx, width, height, points) {
    drawCoordinatePlane(ctx, width, height); // reuse the coordinate plane
    const centerX = width / 2;
    const centerY = height / 2;
    const step = 50;

    ctx.fillStyle = '#ef4444'; // red color for points
    ctx.strokeStyle = '#ef4444';

    points.forEach(([x, y]) => {
        const canvasX = centerX + x * step;
        const canvasY = centerY - y * step;

        // Draw a small filled circle at the point
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 6, 0, Math.PI * 2);
        ctx.fill();

        // Optional: Label the point
        ctx.font = '12px sans-serif';
        ctx.fillText(`(${x}, ${y})`, canvasX + 20, canvasY - 10);
    });
}

// Points to plot
const points = [
    [2, 3],
    [2, -3],
    [-2, 3],
    [-2, -3]
];

plotPoints(pointctx, 500, 500, points);
