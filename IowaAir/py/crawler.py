import os
from selenium import webdriver
chromedriver = "C:\\Users\\the Crimson Moon\\Downloads\\chromedriver_win32\\chromedriver.exe"
os.environ["webdriver.chrome.driver"] = chromedriver
driver = webdriver.Chrome(chromedriver)
driver.get("http://localhost")

def login(e,p):
    driver.find_element_by_id("loginlink").click()
    x=driver.find_element_by_id("email")
    x.send_keys(e)
    x=driver.find_element_by_id("passw")
    x.send_keys(p)
    driver.find_element_by_id("logit").click()
def logout():
    driver.find_element_by_id("logoutlink").click()
def openAdminToolMenu():
    driver.find_element_by_id("toolbit").click()
def clickLinkAddPlane():
    driver.find_element_by_id("addP").click()
def clickLinkUpdatePlane():
    driver.find_element_by_id("upP").click()
def clickLinkAddEmployee():
    driver.find_element_by_id("addE").click()
def clickLinkAddFlight():
    driver.find_element_by_id("addF").click()
def clickLinkUpdateFlight():
    driver.find_element_by_id("upF").click()
def fillAndSubmitAddFlgiht(fnum,gate,model,depd,dept,org,arvd,arvt,dest,ecsa,ecsb,eccps,fcsa,fcsb,fccps,inter,interType,rep):
    driver.find_element_by_id("fnumB").clear()
    driver.find_element_by_id("fnumB").send_keys(fnum)
    driver.find_element_by_id("gateB").clear()
    driver.find_element_by_id("gateB").send_keys(gate)
    driver.find_element_by_id("modelB").send_keys(model)
    driver.find_element_by_id("ddateB").send_keys(depd)
    driver.find_element_by_id("dtimeB").send_keys(dept)
    driver.find_element_by_id("dLoc").send_keys(org)
    driver.find_element_by_id("adateB").send_keys(arvd)
    driver.find_element_by_id("atimeB").send_keys(arvt)
    driver.find_element_by_id("aLoc").send_keys(dest)
    driver.find_element_by_id("ecsaB").clear()
    driver.find_element_by_id("ecsaB").send_keys(ecsa)
    driver.find_element_by_id("ecsbB").clear()
    driver.find_element_by_id("ecsbB").send_keys(ecsb)
    driver.find_element_by_id("eccpsB").clear()
    driver.find_element_by_id("eccpsB").send_keys(eccps)
    driver.find_element_by_id("fcsaB").clear()
    driver.find_element_by_id("fcsaB").send_keys(fcsa)
    driver.find_element_by_id("fcsbB").clear()
    driver.find_element_by_id("fcsbB").send_keys(fcsb)
    driver.find_element_by_id("fccpsB").clear()
    driver.find_element_by_id("fccpsB").send_keys(fccps)
    driver.find_element_by_id("interval").clear()
    driver.find_element_by_id("interval").send_keys(inter)
    driver.find_element_by_id("interval_type").send_keys(interType)
    driver.find_element_by_id("numtime").clear()
    driver.find_element_by_id("numtime").send_keys(rep)
    driver.find_element_by_id("updateAllButton").click()


    
    