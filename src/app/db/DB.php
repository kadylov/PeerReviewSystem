<?php

require_once '.inc/dbInfo.inc';
require_once '../model/Work.php';

class DB
{

    /*Connect to MySQL and select the database.*/
    private function connect()
    {
        $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

        if ($connection->connect_error) {
            die("Failed to connect to the database: " . $connection->connect_error);
        }
        return $connection;

//		$reviewer_name = htmlentities($_POST['RName']);
//		$reviewer_type = htmlentities($_POST['RType']);
//		$reviewer_cred = htmlentities($_POST['RCredential']);
    }

//WID, Title, URL, DateSubmission, DateWritten, IsRetired, Status, AuthorName, AuthorEmail, Tag, RSID
    static public function selectAllWorks()
    {
//        echo "select";
        $conn = self::connect();
        $sql = "select * from Work;";

        $result = $conn->query('SELECT * FROM peer_review_db.Work');

        $works = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($works);
        mysqli_close($conn);

        return $works;

    }

    static public function selectAllReviewer()
    {

    }

    static public function selectScorecard()
    {
    }

    static public function selectReviewHistory()
    {

    }

    static public function selectAdmins()
    {
    }

    static public function selectAdminReviews()
    {

    }

    static public function selectReviewSummary()
    {
    }

    static public function selectDiscussion()
    {

    }

}
