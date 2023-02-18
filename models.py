from sqlalchemy import Boolean, Column, Integer, String, Float
from sql import Base


class PollutionMapData(Base):
    def __init__(self, id: int, No2: float, ozone: float, CO:float, Lead: float, pm10: float, pm25: float):
        self.id = id
        self.No2 = No2
        self.ozone = ozone
        self.CO = CO
        self.Lead = Lead
        self.pm10 = pm10
        self.pm25 = pm25
    __tablename__ = "Pollution Data"

    id = Column(Integer, primary_key=True)
    No2 = Column(Float)
    ozone = Column(Float)
    CO = Column(Float)
    Lead = Column(Float)
    pm10 = Column(Float)
    pm25 = Column(Float)
    