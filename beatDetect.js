// function to detect beats
function BeatDetect() {
  var sampleBuffer = []; // store sum of spectrum values array

  this.detectBeat = function(spectrum) {

    var sum = 0; // initialise the sum of spectrum values
    var isBeat = false;

    for (let i = 0; i < spectrum.length; i++) {
      sum += spectrum[i] * spectrum[i];
    }

    if (sampleBuffer.length == 60)
    {
      // detect a beat
      var sampleSum = 0;

      // store the values of sampleBuffer into sampleSum
      for (let i = 0; i < sampleBuffer.length; i++) {
        sampleSum += sampleBuffer[i];
      }

      // gives us the average value for the the sums for the buffer.
      var sampleAverage = sampleSum / sampleBuffer.length;

      // c is the constant to determine whether how much above average is considered a beat.
      var c = calculateConstant(sampleAverage);

      // check if the sum of amplitudes is greater than the given sample average, if so, it is a beat
      if (sum > sampleAverage * c) {
        isBeat = true;
      }

      // remove the old sample value from the array to add a new one
      sampleBuffer.splice(0, 1);
      sampleBuffer.push(sum);
    }
    else
    {
      sampleBuffer.push(sum);
    }
    return isBeat;
  }

  // function to calculate the constant to determine whether how much above average is considered a beat.
  function calculateConstant(sampleAverage) {
    var varianceSum = 0;

    // calculate the sum of variance
    for (let i = 0; i < sampleBuffer.length; i++) {
      varianceSum += sampleBuffer[i] - sampleAverage;
    }

    // average difference between sampleBuffer and sampleAverage
    var variance = varianceSum / sampleBuffer.length;

    // gradient or slope of the line
    var m = -0.15 / (25 - 200);

    // y-intercept value
    var b = 1 + (m * 200);

    // using equation y = mx + b;
    return (m * variance) + b;
  }
}
