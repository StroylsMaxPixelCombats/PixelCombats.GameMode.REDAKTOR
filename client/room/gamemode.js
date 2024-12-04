import { DisplayValueHeader, Color } from 'pixel_combats/basic';
import { Players, Inventory, Properties, Spawns, Teams, Timers, Game, GameMode, Ui, Damage, BreackGraph, TeamsBalancer, AreaPlayerTriggerService, AreaViewService } from 'pixel_combats/room';

try {
	
// Настройки:
BreackGraph.WeakBlocks.Value = GameMode.Parameters.GetBool("WeakBlocks");
Damage.GetContext().FriendlyFire.Value = true;
Danage.GetContext().DamageOut.Value = true;
BreackGraph.OnlyPlayerBlocksDmg.Value = true;

// Параметры, игры:
Teams.OnRequestJoinTeam.Add(function(player,team) {
 Player.Ui.Hint.Value = "!Приятного, строительства: "Player.NickName"!";
}
// стандартные - команды:
Teams.Add("Blue", "<b><i><color=Blue>Синия - КОМАНДА</color></i></b>", new Color(0, 0, 1, 0));
Teams.Add("Red", "<b><i><color=Red>Красная - КОМАНДА</color></i></b>", new Color(1, 0, 0, 0));
var BlueTeam = Teams.Add("Blue");
var RedTeam = Teams.Add("Red");
RedTeam.Spawns.SpawnPointsGroups.Add(2);
BlueTeam.Spawns.SpawnPointsGroups.Add(1);
BlueTeam.Build.BlocksSet.Value = BuildBlocksSet.AllClear;
RedTeam.Build.BlocksSet.Value = BuildBlocksSet.AllClear;
// Стандартные - лидерБорды:
LeaderBoard.PlayerLeaderBoardValues = [
  new DisplayValueHeader("Kills", "<b><i><color=Yellow>Убийства:</color></b>", "<b><i><color=Yellow>Убийства:</color></b>"),
  new DisplayValueHeader("Deaths", "<b><i><color=Red>Смерти:</color></i></b>", "<b><i><color=Red>Смерти:</color></i></b>"),
  new DisplayValueHeader("Scores", "<b><i><color=Lime>Монеты:</color></i></b>", "<b><i><color=Lime>Монеты:</color></i></b>"),
  new DisplayValueHeader("Status", "<b><i><color=Blue>Статус:</color></b>", "<b><i><color=Blue>Статус:</color></b>"),
  new DisplayValueHeader("AdminLeaderBoard", "<b><i><color=Red>Админ:</a></b>", "<b><i><color=Red>Админ:</a></b>")

];
 
// Вес, игроков - в лидерБорде:
LeaderBoard.PlayersWeightGetter.Set(function(player) {
  return player.Properties.Get("Scores").Value;
});

// Вес - смертей, в лидерБорде:
Ui.GetContext().TeamProp1.Value = { Team: "Blue", Prop: "Deaths" };
Ui.GetContext().TeamProp2.Value = { Team: "Red", Prop: "Deaths" };

// Неуязвимость:
var immortalityTimerName="immortality";
Spawns.GetContext().OnSpawn.Add(function(Player){
	Player.Properties.Immortality.Value = true;
	timer = Player.Timers.Get(immortalityTimerName).Restart(8);
});
Timers.OnPlayerTimer.Add(function(Timer){
	if (Timer.Id != immortalityTimerName) return;
	Timer.Player.Properties.Immortality.Value = false;
});

// Счётчик - убийств:
Damage.OnKill.Add(function(Player, Killed) {
	if (Killed.Team != null && Killed.Team != Player.Team) {
		++Player.Properties.Kills.Value;
		Player.Properties.Scores.Value += 100;
	}
});

// Счётчик - смертей:
Damage.OnDeath.Add(function(Player) {
	++Player.Properties.Deaths.Value;

// Конфигурация - инвентаря:
Inventory.GetContext().Main.Value = false;
Inventory.GetContext().Secondary.Value = false;
Inventory.GetContext().Melee.Value = false;
Inventory.GetContext().Explosive.Value = false;
Inventory.GetContext().Build.Value = false;

// Задаём, консоль:
Teams.OnRequestJoinTeam.Add(function(Player,team){
function GetAdminka(Player) {
Player.Inventory.Main.Value = true;
Player.Inventory.Secondary.Value = true;
Player.Inventory.Melee.Value = true;
Player.Inventory.Explosive.Value = true;
Player.Inventory.Build.Value = true;
Player.Inventory.MainInfinity.Value = true;
Player.Inventory.SecondaryInfinity.Value = true;
Player.Inventory.ExplosiveInfinity.Value = true;
Player.Inventory.BuildInfinity.Value = true;
Player.Build.Pipette.Value = true;
Plyer.Build.FlyEnable.Value = true;
Player.Build.BalkLenChange.Value = true;
Player.Build.BuildRangeEnable.Value = true;
Player.Build.BuildModeEnable.Value = true;
Player.Build.RemoveQuad.Value = true;
Player.Build.FillQuad.Value = true;
Player.Build.FloodFill.Value = true;
Player.Build.ChangeSpawnsEnable.Value = true;
Player.Build.LoadMapEnable.Value = true;
Player.Build.ChangeMapAuthorsEnable.Value = true;
Player.Build.GenMapEnable.Value = true;
Player.Build.ChangeCameraPointsEnable.Value = true;
Player.Build.CollapseChangeEnable.Value = true;
Player.Build.QuadChangeEnable.Value = true;
Player.Build.SetSkyEnable.Value = true;
Player.Build.BlocksSet.Value = BuildBlocksSet.AllClear;
Player.Damage.DamageIn.Value = true;
Player.ContextedProperties.SkinType.Value = 1;
Player.Properties.Get("Status").Value = "<b><color=Lime>Гл</a> <a>Админ</a></b>";
Player.Properties.Get("AdminLeaderBoard").Value = "<b><color=Lime>✓</a></b>";
AdminsTeam.Add(Player);
}
Teams.OnRequestJoinTeam.Add(function(Player,team){
Player.Properties.Get("Status").Value = "<b><color=Lime>НОВИЧОК</a> <a>Игрок</a></b>";
Player.Properties.Get("AdminLeaderBoard").Value = "<b><color=Red>×</a></b>";
Player.ContextedProperties.SkinType.Value = 3;
Player.ContextedProperties.MaxHp.Value = 100;
});
// Для, автора:
if (Player.id == "9183CF2B463E5CD6") {
 GetAdminka(Player);
}
// Даём админку - 1 игроку:
Player.Properties.Get("AdminLeaderBoard").Value == "<b><color=Lime>✓</a></b>") {
 GetAdminka(Player);
});

// Стандартные - спавны:
Teams.OnPlayerChangeTeam.Add(function(Player){ 
  Player.Spawns.Spawn();
});

// Стандартный таб - игры:
PlayersTeam.Properties.Get("Deaths").Value = "<b>Не, знаешь: зон? Создай, зону: Help!</b>";
AdminsTeam.Propertues.Get("Deaths").Value = `???`;

// Делаем респавн, на: 3 секунды:
Spawns.GetContext().RespawnTime.Value = 3;

} catch (e) {
	Players.All.forEach(p => {
                p.PopUp(`${e.name}: ${e.message} ${e.stack}`);
        });
}

 







