
import unittest
from main import sorted_list_sum

class TestMain(unittest.TestCase):
    def test_sorted_list_sum(self):
        """
        Test that the function correctly removes strings with odd lengths and sorts the list
        """
        self.assertEqual(sorted_list_sum(["aa", "a", "aaa"]), ["aa"], "Test case 1 failed")
        self.assertEqual(sorted_list_sum(["ab", "a", "aaa", "cd"]), ["ab", "cd"], "Test case 2 failed")
        self.assertEqual(sorted_list_sum(["abc", "de", "fgh", "ij", "klm"]), ["de", "ij", "abc", "fgh", "klm"], "Test case 3 failed")
        self.assertEqual(sorted_list_sum(["abc", "abc", "de", "de"]), ["de", "de", "abc", "abc"], "Test case 4 failed")

if __name__ == '__main__':
    unittest.main()
