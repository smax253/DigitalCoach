import os
from server import app

if __name__ == "__main__":
    port = 8900
    app.run(debug=True, port=port)
