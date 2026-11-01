from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

import models
from database import SessionLocal, engine

shopie = FastAPI()


models.Base.metadata.create_all(bind=engine)

def get_my_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ProductCreate(BaseModel):
    name: str
    price: float
    stock: int

@shopie.get('/')
def home():
    return {"status": "Success", "message": "Market Manager website!"}


@shopie.get('/products')
def Get_Your_Products(db: Session = Depends(get_my_db)):
    db_products = db.query(models.Products).all()
    return {"product_list": db_products}
    

@shopie.get('/products/{id}')
def Get_Your_Products_By_id(id: int, db: Session = Depends(get_my_db)):
    db_products = db.query(models.Products).filter(models.Products.id == id).first()

    if not db_products:
        return {'Error': 'Product not found'}
    return {'select_product': db_products}


@shopie.post('/products')
def Add_Your_Product(product: ProductCreate, db: Session = Depends(get_my_db)):
    #db_product = db.query(models.Products).filter(models.Products.id == id).first()
    product_add = models.Products(
        product_name=product.name,
        price=product.price, 
        stock_quantity=product.stock
    )
    db.add(product_add)
    db.commit()
    db.refresh(product_add)
    return {"Status": "Success", "Message": "Product added successfully!", "product": product_add}


@shopie.put('/products/{id}')
def Update_Your_Products(id: int, product: ProductCreate, db: Session = Depends(get_my_db)):
    db_product = db.query(models.Products).filter(models.Products.id == id).first()
    
    if not db_product:
        return {'Error': 'Product with this ID not found'}
    
    db_product.product_name = product.name
    db_product.price = product.price
    db_product.stock_quantity = product.stock
    
    db.commit()
    db.refresh(db_product)
    return {"Message": "Product updated successfully!", "updated_product": db_product}


@shopie.delete('/product/{id}')
def Delete_Your_Products(id: int, db: Session = Depends(get_my_db)):
    db_product = db.query(models.Products).filter(models.Products.id == id).first()
    
    if not db_product:
        return {'Error': 'Product with this ID not found'}
    
    db.delete(db_product)
    db.commit()
    return {"Message": "Product deleted successfully!"}