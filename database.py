import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote_plus
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv

load_dotenv()


raw_password = os.getenv("DB_PASSWORD")
encoded_password = quote_plus(raw_password) if raw_password else ""
URL_DATABASE = f"mysql+pymysql://root:{encoded_password}@127.0.0.1:3306/shop_db"

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()