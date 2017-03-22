import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

def init_driver():
	driver = webdriver.Firefox()
	driver.wait = WebDriverWait(driver, 30)
	return driver

def select_location(driver):
        try:
            location_selector = driver.wait.until(EC.element_to_be_clickable(
                (By.NAME, "location")))
            location_selector = Select(location_selector)
            location_selector.select_by_visible_text("Richmond Olympic Oval")
        except NoSuchElementException:
            print("No such element found")
            print("Element not visible")
        except TimeoutException:
            print("Timed out")

def get_class_data(driver):
    schedule = driver.wait.until(EC.visibility_of_element_located(
        (By.CLASS_NAME, "schedule")))
    rows = schedule.find_elements(By.TAG_NAME, "tr")
    for row in rows:
        cols = row.find_elements(By.TAG_NAME, "td")
        for col in cols:
            print(col.text)

if __name__ == "__main__":
    driver = init_driver()
    driver.get("https://www.yyoga.ca/bc/schedules")
    select_location(driver)
    print("Everything seems to have gone well?")
    get_class_data(driver)
    time.sleep(50)
    driver.quit()
