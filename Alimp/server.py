import os

from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

GOOGLE_API_KEY =os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

def convert_html_css_to_react(html_code, css_code):
    prompt = f"""Convert the following HTML and CSS into a React functional component using Tailwind CSS.
    - The component should be named MyComponent.
    - Ensure that the output includes export default MyComponent; at the end.
    - Return only the React code without any markdown code fences (```jsx) or additional explanations.

    HTML Input:
    {html_code}

    CSS Input:
    {css_code}

    Output:
    A complete React functional component named MyComponent, with Tailwind CSS classes, and ending with export default MyComponent;.
    """

    try:
        model = genai.GenerativeModel("gemini-1.5-pro")  
        response = model.generate_content(prompt)
        return response.text 
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/convert', methods=['POST'])
def convert():
    data = request.json
    html_code = data.get("html", "")
    css_code = data.get("css", "")

    if not html_code or not css_code:
        return jsonify({"error": "HTML and CSS are required"}), 400

    react_code = convert_html_css_to_react(html_code, css_code)
    return jsonify({"component": react_code})

if __name__ == '__main__':
    print("🚀 Server is running on port 5000")
    app.run(debug=True, port=5000)
