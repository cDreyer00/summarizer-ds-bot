from transformers import pipeline
import sys

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def Summarize(ARTICLE):
    artLen = len(ARTICLE)

    if(artLen < 200):
        return "low contet to summarize"

    min_length = 100 if artLen > 400 else 50
    max_length = 400 if artLen > 1500 else 200

    res = summarizer(ARTICLE, max_length=max_length, min_length=min_length, do_sample=False)[0]['summary_text']
    return res

print(Summarize(sys.argv[1]))