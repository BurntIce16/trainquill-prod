import re
from faster_whisper import WhisperModel
import json
import sys
import os

def generate_transcript(audio_path):
    print("Loading Whisper model...")
    model = WhisperModel("tiny", device="cpu", compute_type="int8")
    
    base_name = os.path.splitext(os.path.basename(audio_path))[0]
    output_path = f"{base_name}_transcript.json"
    
    print(f"Transcribing {audio_path}...")
    segments, _ = model.transcribe(audio_path, word_timestamps=True)
    
    sentences_out = []
    for segment in segments:
        if hasattr(segment, "words") and segment.words:
            sentence_words = []
            sentence_start = None
            for word_info in segment.words:
                # Set sentence start on the first word in a sentence
                if sentence_start is None:
                    sentence_start = word_info.start
                sentence_words.append(word_info.word)
                # Check if this word ends a sentence
                if re.search(r'[.!?]$', word_info.word):
                    sentence_text = " ".join(sentence_words).strip()
                    sentences_out.append({
                        "text": sentence_text,
                        "startTime": sentence_start,
                        "endTime": word_info.end
                    })
                    sentence_words = []
                    sentence_start = None
            # If leftovers exist, add them as a sentence
            if sentence_words:
                sentence_text = " ".join(sentence_words).strip()
                sentences_out.append({
                    "text": sentence_text,
                    "startTime": sentence_start,
                    "endTime": segment.end
                })
        else:
            # Fallback to entire segment if no word-level data
            sentences_out.append({
                "text": segment.text.strip(),
                "startTime": segment.start,
                "endTime": segment.end
            })
    
    print(f"Writing transcript to {output_path}...")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(sentences_out, f, ensure_ascii=False, indent=2)
    
    print("Done!")
    return output_path

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 generate_transcript.py <audio_file>")
        sys.exit(1)
    
    audio_path = sys.argv[1]
    if not os.path.exists(audio_path):
        print(f"Error: File {audio_path} does not exist")
        sys.exit(1)
        
    output_file = generate_transcript(audio_path)
    print(f"\nTranscript saved to: {output_file}")
