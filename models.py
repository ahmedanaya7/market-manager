from sqlalchemy import Column, Integer, String, Float
from database import Base

class Products(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(255), index=True)
    price = Column(Float)
    stock_quantity = Column(Integer)