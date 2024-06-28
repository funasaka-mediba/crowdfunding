CREATE DATABASE IF NOT EXISTS `crowdfunding`;

USE `crowdfunding`;

DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
  `id` BIGINT(20) unsigned AUTO_INCREMENT PRIMARY KEY COMMENT 'プロジェクトID',
  `title` VARCHAR(255) NOT NULL COMMENT 'プロジェクト名',
  `description` TEXT NOT NULL COMMENT 'プロジェクト説明',
  `goalAmount` DECIMAL(10, 2) NOT NULL COMMENT '目標金額',
  `deadline` DATE NOT NULL COMMENT '締め切り日',
  `imageUrl` VARCHAR(255) COMMENT '画像URL',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='クラウドファンディングのプロジェクト';

DROP TABLE IF EXISTS `return`;
CREATE TABLE IF NOT EXISTS `return` (
  `id` BIGINT(20) unsigned AUTO_INCREMENT PRIMARY KEY COMMENT 'リターンID',
  `project_id` INT NOT NULL COMMENT 'プロジェクトID',
  `title` VARCHAR(255) NOT NULL COMMENT 'リターン名',
  `description` TEXT NOT NULL COMMENT 'リターン説明',
  `amount` DECIMAL(10, 2) NOT NULL COMMENT '支援金額',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='クラウドファンディングの支援に対するリターン';

-- project テーブルにサンプルデータを追加
INSERT INTO `project` (`title`, `description`, `goalAmount`, `deadline`, `imageUrl`) VALUES
('プロジェクト1', 'プロジェクト1の説明', 100000.00, '2023-12-31', 'http://example.com/image1.jpg'),
('プロジェクト2', 'プロジェクト2の説明', 200000.00, '2023-12-31', 'http://example.com/image2.jpg'),
('プロジェクト3', 'プロジェクト3の説明', 300000.00, '2023-12-31', 'http://example.com/image3.jpg'),
('プロジェクト4', 'プロジェクト4の説明', 400000.00, '2023-12-31', 'http://example.com/image4.jpg'),
('プロジェクト5', 'プロジェクト5の説明', 500000.00, '2023-12-31', 'http://example.com/image5.jpg');

-- return テーブルにサンプルデータを追加
-- projectIDは、実際に存在するプロジェクトIDに置き換えてください。
INSERT INTO `return` (`project_id`, `title`, `description`, `amount`) VALUES
(1, 'リターン1', 'リターン1の説明', 1000.00),
(2, 'リターン2', 'リターン2の説明', 2000.00),
(3, 'リターン3', 'リターン3の説明', 3000.00),
(4, 'リターン4', 'リターン4の説明', 4000.00),
(5, 'リターン5', 'リターン5の説明', 5000.00);
