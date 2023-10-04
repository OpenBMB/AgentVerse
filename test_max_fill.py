
import unittest
from main import max_fill

class TestMaxFill(unittest.TestCase):
    def test_max_fill(self):
        """
        Test max_fill with multiple test cases
        """
        # Test case 1: grid with no water
        grid = [[0,0,0], [0,0,0]]
        capacity = 5
        self.assertEqual(max_fill(grid, capacity), 0, "Expected output is 0")

        # Test case 2: grid with water but bucket capacity is larger than total amount of water
        grid = [[0,0,1,0], [0,1,0,0], [1,1,1,1]]
        capacity = 10
        self.assertEqual(max_fill(grid, capacity), 1, "Expected output is 1")

        # Test case 3: grid with water and bucket capacity is smaller than total amount of water
        grid = [[0,0,1,1], [0,0,0,0], [1,1,1,1], [0,1,1,1]]
        capacity = 2
        self.assertEqual(max_fill(grid, capacity), 5, "Expected output is 5")

        # Test case 4: grid with water and bucket capacity is equal to total amount of water
        grid = [[0,0,1,0], [0,1,0,0], [1,1,1,1]]
        capacity = 6
        self.assertEqual(max_fill(grid, capacity), 1, "Expected output is 1")

if __name__ == '__main__':
    unittest.main()
