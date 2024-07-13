//var System = importNamespace('System');
import { Color } from 'pixel_combats/basic';
import { Build, BuildBlocksSet, Teams, Damage, BreackGraph, Ui, Properties, GameMode, Spawns } from 'pixel_combats/room';

// Настройки
Damage.FriendlyFire = false;
BreackGraph.OnlyPlayerBlocksDmg = false;
BreackGraph.WeakBlocks = true;
// Делаем возможным ломать, все блоки
BreackGraph.BreackAll = true;
// Показываем количество, квадов
Ui.GetContext().QuadsCount.Value = true;
// Разрешаем все чистые, блоки
Build.GetContext().BlocksSet.Value = BuildBlocksSet.AllClear;
// Строительные, опции
Build.GetContext().Pipette.Value = true;
Build.GetContext().FloodFill.Value = true;
Build.GetContext().FillQuad.Value = true;
Build.GetContext().RemoveQuad.Value = true;
Build.GetContext().BalkLenChange.Value = true;
Build.GetContext().FlyEnable.Value = true;
Build.GetContext().SetSkyEnable.Value = true;
Build.GetContext().GenMapEnable.Value = true;
Build.GetContext().ChangeCameraPointsEnable.Value = true;
Build.GetContext().QuadChangeEnable.Value = true;
Build.GetContext().BuildModeEnable.Value = true;
Build.GetContext().CollapseChangeEnable.Value = true;
Build.GetContext().RenameMapEnable.Value = true;
Build.GetContext().ChangeMapAuthorsEnable.Value = true;
Build.GetContext().LoadMapEnable.Value = true;
Build.GetContext().ChangeSpawnsEnable.Value = true;
Build.GetContext().BuildRangeEnable.Value = true;

// Запрет нанесения, урона
Damage.GetContext().DamageOut.Value = false;

// Параметры, режима 
Properties.GetContext().GameModeName.Value = "GameMode/EDITOR";
// Создаём, команды
red = GameMode.Parameters.GetBool("RedTeam");
blue = GameMode.Parameters.GetBool("BlueTeam");
if (red || !red && !blue) {
	Teams.Add("Red", "Teams/Red", new Color(1, 0, 0, 0));
	Teams.Get("Red").Spawns.SpawnPointsGroups.Add(1);
}
if (blue || !red && !blue) {
	Teams.Add("Blue", "Teams/Blue", new Color(0, 0, 1, 0));
	Teams.Get("Blue").Spawns.SpawnPointsGroups.Add(2);
}

// Зазрешаем вход в команды, по запросу
Teams.OnRequestJoinTeam.Add(function(player,team){team.Add(player);});
// Спавн по входу, в команду
Teams.OnPlayerChangeTeam.Add(function(player){ player.Spawns.Spawn()});

// Задаём, подсказку
Ui.GetContext().Hint.Value = "!Редактируйте, КАРТУ!";

// Конфигурация, инвентаря
var roomInventory = Inventory.GetContext();
roomInventory.Main.Value = false;
roomInventory.Secondary.Value = false;
roomInventory.Melee.Value = true;
roomInventory.Explosive.Value = false;
roomInventory.Build.Value = true;
roomInventory.BuildInfinity.Value = true;

// Моментальный, спавн
Spawns.GetContext().RespawnTime.Value = 0;
