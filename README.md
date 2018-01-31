# Ecosistema


use the readme.md file to describe:

    the project idea
    used libraries
    found problems & solutions

Used libraries:
►p5
►p5.dom
►p5.sound

Problem: Very bad performance caused by tint() command
Solution: Depending on number of pixel, tint() takes longer to execute, even on transparent pixel, so we managed to reduce the resolution of tinted images and we cropped every useless pixel.

Problem: Long loading
Solution: To reduce loading time we compressed all images used with a free software called "pinga", reducing images by even 70%.
To reduce sounds size we managed to convert tracks to mono instead of stereo, and we made small files that are seamlessly loopable.

Problem: Looping sounds have a split second of silence at the end of reproduction
Solution: To get a perfect loopable sound (like rain) we had to use .WAV files instead of .MP3 files.

Problem: Choppy webcam pixel processing
Solution: To get ambient brightness instead of analyizing every pixel of the webcam input, we were forced to sample only a small number of pixel to keep the project framerate acceptable

Problem: Create different animals that have 90% of code in common without having to code different objects hard to mantain
Solution: We created just one object that is shared by every creature (fox,otter,fish and tree) that share a lot of actions (like grow, die, speak...) and some custom instuctions that run only for certain creatures. When creating the object, we can specify which kind of creature is by passing an argument.

Problem: Keep animation length in seconds across different framerate
Solution: We don't want that, for example, an animation that takes one second to reproduce on a PC @60 fps it reproduce at half speed (2 seconds) on a smarthpone @30 fps. To avoid this we used the frame time instead of the frame count. Frame time is equal to 1/frameRate.

