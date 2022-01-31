import csv
parsed = open("parsed_transcript.csv", "w", encoding="utf-8", errors="ignore", newline="")
writer = csv.writer(parsed)
with open("interview_transcripts.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)

    for line in reader:
        outputLine = []
        outputLine += [line[0].strip()]
        for entry in line[1].split('|'):
            outputLine += [entry.strip()]
        print(outputLine)
        writer.writerow(outputLine)








