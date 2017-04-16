import time
import subprocess
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC

def init_driver():
	driver = webdriver.Firefox()
	driver.wait = WebDriverWait(driver, 30)
	return driver

def select_location(driver):
        location_selector = driver.wait.until(EC.element_to_be_clickable(
            (By.NAME, "location")))
        location_selector = Select(location_selector)
        location_selector.select_by_visible_text("Richmond Olympic Oval")

def get_class_data(driver):
    data = ''
    schedule = driver.wait.until(EC.visibility_of_element_located(
        (By.CLASS_NAME, "schedule")))
    rows = schedule.find_elements(By.TAG_NAME, "tr")
    for row in rows:
        cols = row.find_elements(By.TAG_NAME, "td")
        for col in cols:
            data += col.text
            data += '\n'
        data += "---new_row---\n"
    return data

def write_file(data):
    out_file = open('yoga_classes.txt', 'w')
    out_file.write(str(data))
    out_file.close()

if __name__ == "__main__":
    driver = init_driver()
    driver.get("https://www.yyoga.ca/bc/schedules")
    select_location(driver)
    class_data = get_class_data(driver)
    time.sleep(45)
    driver.quit()
    write_file(class_data)
    subprocess.call(['node', 'twilio-client.js'])
