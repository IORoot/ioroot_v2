# Reframer - AI-Powered Video Reframing

## Hero Section
Transform your videos with AI-powered reframing. Reframer automatically detects and follows the most important content in your videos, creating perfectly framed shots every time.

## Key Highlights & Best Features
- **AI-Powered Content Detection**: Advanced machine learning algorithms identify and track the most important elements in your video
- **Smart Cropping**: Automatically maintains focus on key subjects while maintaining visual composition
- **Multiple Output Formats**: Export to any aspect ratio (16:9, 9:16, 1:1, custom)
- **Batch Processing**: Process multiple videos simultaneously
- **Preserve Quality**: Maintains original video quality while delivering perfectly framed content
- **Time-Saving**: Reduce hours of manual editing to minutes
- **User-Friendly Interface**: Simple drag-and-drop operation with intuitive controls

## Features
### Core Features
- **Intelligent Content Detection**
  - Automatically identifies people, faces, and important objects
  - Tracks movement and maintains focus on key subjects
  - Adapts to changing scenes and multiple subjects

- **Smart Framing**
  - Dynamic cropping that follows the action
  - Maintains visual composition and balance
  - Smooth transitions between different focal points
  - Customizable framing rules and preferences

- **Output Options**
  - Multiple aspect ratio support (16:9, 9:16, 1:1, custom)
  - Batch processing capabilities
  - High-quality export options
  - Custom output resolution settings

- **User Interface**
  - Drag-and-drop video upload
  - Real-time preview
  - Intuitive timeline controls
  - Progress tracking
  - Batch processing queue

## Reasons to Use Reframer
1. **Save Time**: Reduce hours of manual editing to minutes
2. **Consistent Quality**: Get professional-looking results every time
3. **Multi-Platform Ready**: Create content optimized for any platform
4. **Cost-Effective**: Eliminate the need for expensive editing software or services
5. **Easy to Use**: No technical expertise required
6. **Scalable**: Process multiple videos simultaneously
7. **Quality Preservation**: Maintain original video quality while improving framing

## Use Cases
### Content Creators
- Convert landscape videos to portrait for TikTok/Instagram
- Create multiple versions of the same content for different platforms
- Maintain focus on speakers during interviews
- Optimize vlogs for different social media platforms

### Businesses
- Repurpose marketing videos for different platforms
- Create consistent branding across all social media
- Optimize product videos for different display formats
- Convert webinar recordings for social media sharing

### Educational Content
- Reframe lecture recordings for mobile viewing
- Optimize tutorial videos for different platforms
- Maintain focus on important visual elements
- Create consistent formatting across course materials

### Event Coverage
- Convert event recordings for social media
- Maintain focus on speakers and presentations
- Create highlight reels in different formats
- Optimize live stream recordings for different platforms

## Technical Specifications
### System Requirements
- **Operating System**: macOS 11.0 or later
- **Processor**: Apple Silicon or Intel Core i5 or better
- **Memory**: 8GB RAM minimum (16GB recommended)
- **Storage**: 1GB free disk space
- **Graphics**: Metal-capable graphics card

### Supported Formats
- **Input Formats**: MP4, MOV, AVI, MKV
- **Output Formats**: MP4, MOV
- **Codecs**: H.264, H.265
- **Maximum Resolution**: 4K (3840x2160)
- **Maximum File Size**: 10GB per file

### Performance
- Processing speed varies based on:
  - Video length
  - Resolution
  - System specifications
  - Number of simultaneous processes

## All Options
### Input Options
- Single file upload
- Batch upload
- Drag and drop support
- Folder monitoring

### Processing Options
- Target aspect ratio selection
- Custom aspect ratio input
- Output resolution settings
- Quality presets
- Processing priority

### Output Options
- Multiple format export
- Batch export
- Custom naming conventions
- Output folder selection
- Quality settings

### Advanced Settings
- Content detection sensitivity
- Movement smoothing
- Transition speed
- Focus area size
- Custom framing rules

## Showcase
### Before & After Examples
[Placeholder for video comparisons showing:]
- Landscape to portrait conversion
- Multi-subject tracking
- Dynamic scene adaptation
- Different aspect ratio examples

### Success Stories
[Placeholder for testimonials and case studies from:]
- Content creators
- Marketing teams
- Educational institutions
- Event organizers

## FAQs
### General Questions
**Q: How does Reframer work?**
A: Reframer uses advanced AI algorithms to analyze your video content, identify important subjects, and automatically create perfectly framed shots while maintaining the original quality.

**Q: What types of videos work best with Reframer?**
A: Reframer works well with most types of content, including interviews, vlogs, presentations, and event recordings. It's particularly effective with content that has clear subjects or focal points.

**Q: Can I process multiple videos at once?**
A: Yes, Reframer supports batch processing, allowing you to convert multiple videos simultaneously.

### Technical Questions
**Q: What video formats are supported?**
A: Reframer supports common formats including MP4, MOV, AVI, and MKV. Output is available in MP4 and MOV formats.

**Q: Will the quality of my video be affected?**
A: Reframer maintains the original video quality while only adjusting the framing. The output quality depends on your chosen export settings.

**Q: What are the system requirements?**
A: Reframer requires macOS 11.0 or later, 8GB RAM minimum (16GB recommended), and a Metal-capable graphics card.

### Usage Questions
**Q: Do I need video editing experience to use Reframer?**
A: No, Reframer is designed to be user-friendly and requires no technical expertise. The interface is intuitive and easy to use.

**Q: Can I customize the framing rules?**
A: Yes, Reframer offers various customization options for framing rules, including detection sensitivity and transition speed.

**Q: How long does processing take?**
A: Processing time depends on video length, resolution, and your system specifications. Most videos process in minutes rather than hours.

### Support Questions
**Q: Is there a trial version available?**
A: Yes, we offer a trial version with limited features so you can test Reframer before purchasing.

**Q: What kind of support is available?**
A: We provide email support, documentation, and video tutorials to help you get the most out of Reframer.

**Q: Can I get a refund if I'm not satisfied?**
A: Yes, we offer a 30-day money-back guarantee if you're not completely satisfied with Reframer.

## Call to Action
Ready to transform your videos? Download Reframer today and start creating perfectly framed content in minutes.

[Download Now] [Start Free Trial] [Learn More] 



# Content-Aware Video Cropping

## Approach & Design Decisions

### Core Approach
1. **Object Detection & Tracking**
   - Using YOLOv8 for reliable object detection
   - Multiple model sizes available (n, s, m, l, x) to balance speed vs accuracy
   - Implemented object tracking to maintain subject consistency across frames

2. **Intelligent Crop Window Selection**
   - Prioritizes subjects based on importance (people > faces > animals > objects)
   - Uses weighted scoring system considering:
     - Subject type (class weight)
     - Size of subject
     - Position in frame
     - Detection confidence

3. **Performance Optimization**
   - Processes keyframes instead of every frame
   - Uses parallel processing for faster analysis
   - Interpolates crop windows between keyframes
   - Implements temporal smoothing for stable transitions

### Key Design Decisions

1. **YOLOv8 Selection**
   - Chosen for balance of speed and accuracy
   - Provides good detection even for small objects
   - Multiple model sizes allow flexibility based on needs

2. **Keyframe Processing**
   - Process every Nth frame instead of all frames
   - Reduces computational load significantly
   - Interpolate between keyframes for smooth transitions

3. **Error Handling**
   - Fallback mechanisms for saliency detection
   - Local model loading with remote fallback
   - Graceful handling of missing frames or detection failures

## Setup & Running Instructions

### 1. System Requirements
- Python 3.8 or higher
- CUDA-compatible GPU recommended (but not required)
- 8GB RAM minimum (16GB recommended)

### 2. Installation

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install required packages
pip install ultralytics opencv-python numpy tqdm
```

### 3. Download Models
```bash
# Download YOLOv8 models
python download_models.py
```

### 4. Running the Code

Basic usage:
```bash
python main.py --input <input_video> --output <output_video>
```

Advanced usage:
```bash
python main.py --input input.mp4 --output output.mp4 \
    --model_size m \          # Model size (n/s/m/l/x)
    --skip_frames 5 \         # Process every 5th frame
    --conf_threshold 0.6 \    # Detection confidence threshold
    --max_workers 4          # Number of parallel workers
```

### 5. Common Command Arguments

| Argument | Purpose | Default | Options |
|----------|---------|---------|----------|
| --input | Input video path | Required | Path to video |
| --output | Output video path | Required | Path to save |
| --model_size | YOLOv8 model size | 'n' | 'n','s','m','l','x' |
| --skip_frames | Frame skip rate | 10 | Any positive int |
| --conf_threshold | Detection confidence | 0.5 | 0.0 to 1.0 |
| --max_workers | Parallel workers | 4 | Any positive int |

### 6. Optimization Tips

For Speed:
- Use smaller model size (`--model_size n`)
- Increase frame skip (`--skip_frames 15`)
- Adjust workers based on CPU (`--max_workers`)

For Quality:
- Use larger model (`--model_size m` or `l`)
- Decrease frame skip (`--skip_frames 5`)
- Increase confidence (`--conf_threshold 0.6`)

### 7. Troubleshooting

If you encounter:
- **Memory issues**: Reduce `max_workers` or use smaller model
- **Slow processing**: Increase `skip_frames` or use smaller model
- **Poor detection**: Use larger model size or decrease confidence threshold
- **Unstable output**: Increase smoothing window size 


# AI Video Reframe

Batch convert landscape to portrait videos using AI.

forked from [https://github.com/Sagar-lab03/AI-Content-Aware-Video-Cropping](https://github.com/Sagar-lab03/AI-Content-Aware-Video-Cropping)

---

## Intro

This software will detect motion in the video and crop the content dynamically keeping the main subject in the frame.
There are many settings, but the main ones are:
- Speed vs Quality : You can select how many frames to use AI on. The more you do, the better the tracking but the longer it takes.
- Aspect Ratio : Specify the size of the reframe.
- FFMPEG : Used to keep audio and do custom functions like trimming the footage.

---

## Requirements
1. Python 3
2. [FFMPEG](https://github.com/FFmpeg/FFmpeg)

> This runs linux/macos shell scripts - but it easily can be run in windows if needed. Just read the `run.sh` file and run commands by hand.

---

## Installation

1. Clone this repository:
```bash
git clone https://github.com/IORoot/AI_Video_Reframe
```

2. Setup virtual environment
```bash
cd AI_Video_Reframe
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
#or individually:
pip install ultralytics opencv-python numpy tqdm
```

## Run a single file

To accept the defaults and convert landscape 16:9 videos to 3:4 videos, do this:
```bash
./run.sh /Location/of/MP4/file.mp4
```

## Changing the settings

The main line to run the code is:
```bash
python main.py --input "${FILENAME}" --output "${PROCESSED_FILENAME}" --model_size m --skip_frames 3 --smoothing_window 30 --conf_threshold 0.5 --use_saliency --max_workers 6 --target_ratio 0.75
```

### Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--input` | Path to input video file | Required |
| `--output` | Path to output video file | Required |
| `--target_ratio` | Target aspect ratio (width/height) | 0.5625 (9:16) |
| `--model_size` | YOLOv8 model size (n, s, m, l, x) | n (nano) |
| `--skip_frames` | Process every Nth frame for detection | 10 |
| `--smoothing_window` | Number of frames for temporal smoothing | 30 |
| `--conf_threshold` | Confidence threshold for detections | 0.5 |
| `--use_saliency` | Enable saliency detection | False |
| `--max_workers` | Maximum number of worker threads | 4 |

### Model Size Selection Guide

| Model Size | Flag | Description | Use Case |
|------------|------|-------------|----------|
| Nano (n) | `--model_size n` | Smallest and fastest model | Testing or low-power devices |
| Small (s) | `--model_size s` | Good balance for mobile devices | Mobile applications |
| Medium (m) | `--model_size m` | Balanced model | General purpose detection |
| Large (l) | `--model_size l` | Higher accuracy, slower speed | When accuracy is more important |
| XLarge (x) | `--model_size x` | Highest accuracy, slowest speed | When maximum accuracy is required |


---

### Scenarios:

I've found that if you want highly accurate (but very slow processing) video reframing, you need to do the following flags:
```bash
--skip_frames 0   # Use AI to detect movement on EVERY Frame
--model_size x    # Use biggest AI Model
--max_workers 8   # Or the number of CPU cores you have
```

Do a good job of tracking, but fast movements might not be caught:
```bash
--skip_frames 3   # Skip 3 frames, and then use AI on 1. Repeat.
--model_size m    # use the medium AI model
--max_workers 6   # 75% of All cores
```

Fast, but inaccurate tracking - good for low movement or interview videos:
```bash
--skip_frames 30  # on a 30fps video, use 1 frame per second.
--model_size s    # use a small AI Model
--max_workers 6   # 75% of cores
```

There are a lot more settings and the python code can be changed to make even more alterations too.

---

## Batch Runs

Use like so:

```bash
./run_batch.sh /folder/with/videos/in/ 
```

This will find all `mp4` files in any subdirectory within that folder. It will then create a new file
called `run_all_found_files.sh` which lists every file and the run command against each one. 

The reason that I prefer using this method rather than just a loop over each file and running it is
because you can open up the `run_all_found_files.sh` file and check how far the batch has got through.
It also allow you to cancel the process at any time and then start again (it will skip any already done)
without a problem.

Once all videos are converted, the `run_all_found_files.sh` file is removed.


## Output

The reframed videos will be in a subfolder within the directory of the found video file.

FFMPEG is used to copy the audio from the original to the reframed version since the main
python code does not do that.


## Credit

This code was originally from [https://github.com/Sagar-lab03/AI-Content-Aware-Video-Cropping](https://github.com/Sagar-lab03/AI-Content-Aware-Video-Cropping) and all the AI work is theirs.
I've slightly adapted it to include the `bash` scripts and FFMPEG bits for my own usage.
