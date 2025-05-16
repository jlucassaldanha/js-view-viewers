from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello World do site"

@app.route("/contatos")
def contatos():
    return "Contatos"

@app.route("/views")
def views():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()