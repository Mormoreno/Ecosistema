# Ecosystem
[!alt text](https://github.com/Mormoreno/Ecosistema/Preview.png)

We wanted to create a small ecosystem with a simple food chain to represent how climate and habitat changes can affect the animal populations that thrive on that ecosystem. In fact it’s necessary to have a well balanced climate to have a healthy ecosystem, as extreme weather phenomena can disrupt the equilibrium. The user will be able to affect the climate in multiple ways, like determining the temperature or the weather. Furthermore, the user will also be capable of altering the environment by causing earthquakes or other catastrophes like floods or drought.

Used libraries:
►p5
►p5.dom
►p5.sound

Problem: Very bad performance caused by tint(0) command.
Solution: Depending on the image resolution, tint() takes longer to execute even on transparent pixels. We managed to reduce the resolution of tinted images and we cropped out every useless pixel.

Problem: Long loading
Solution: To reduce the loading time all images were compressed using a free software called "pinga", reducing the size even by 70%.
To reduce sounds size we converted the tracks from stereo to mono and made small files that are seamlessly loopable.

Problem: Looping sounds have a split second of silence at the end of reproduction
Solution: To get a perfect loopable sound, like rain, we had to use .WAV files instead of .MP3 files.

Problem: Choppy webcam pixel processing
Solution: To get ambient brightness instead of analyzing every pixel of the webcam input, we were forced to sample only a small number of pixel to keep the project framerate acceptable

Problem: Create different animals that have 90% of code in common without having to code different objects hard to maintain
Solution: We created only one object shared by every creature (fox,otter,fish and tree) that share a lot of actions, like growing, dying, speaking. Than we coded also some custom instructions that run only for certain creatures. When creating the object, we can specify which kind of creature it is by passing an argument.

Problem: Keeping the same animation length across different platforms that have different framerates.
Solution: Since an animation that takes one second to reproduce on a PC at 60 fps would be reproduced at half speed (2 seconds) on a smartphone at 30 fps, in order to avoid this we used the frame time instead of the frame count. Frame time is equal to 1/frameRate.
