import { DisplayValueHeader, Color } from 'pixel_combats/basic';
import { Players, Inventory, Properties, Spawns, Teams, Timers, Game, GameMode, Ui, Damage, BreackGraph, TeamsBalancer } from 'pixel_combats/room';

// Настройки:
Damage.GetContext().FriendlyFire = GameMode.Parameters.GetBool("DamageFireTeams");
Danage.GetContext().DamageOut = GameMode.Parameters.GetBool("DamageTeams");
BreackGraph.OnlyPlayerBlocksDmg = GameMode.Parameter.GetBool("BlocksOnly");
BreackGraph.WeakBlocks.Value = true;

// Параметры, игры:
Teams.OnRequestJoinTeam.Add(function(player,team){
 Player.Ui.Hint.Value = "!Приятного, строительства: "Player.NickName"!";
// Создаём, команды:
Teams.Add("Blue", "<b><i><color=Blue>Синия - КОМАНДА</color></i></b>", new Color(0, 0, 1, 0));
Teams.Add("Red", "<b><i><color=Red>Красная - КОМАНДА</color></i></b>", new Color(1, 0, 0, 0));
Teams.Add("Black", "<b><i>АВТОРЫ</i></b>", new Color(0, 0, 0, 0));
var BlueTeam = Teams.Add("Blue");
var RedTeam = Teams.Add("Red");
var BlackTeam = Teams.Add("Black");
BlueTeam.Build.BlocksSet.Value = BuildBlocksSet.AllClear;
RedTeam.Build.BlocksSet.Value = BuildBlocksSet.AllClear;
// Создаём, лидерБорды:
LeaderBoard.PlayerLeaderBoardValues = [
  new DisplayValueHeader("Kills", "<b><i><color=Yellow>Убийства:</color></b>", "<b><i><color=Yellow>Убийства:</color></b>"),
  new DisplayValueHeader("Deaths", "<b><i><color=Red>Смерти:</color></i></b>", "<b><i><color=Red>Смерти:</color></i></b>"),
  new DisplayValueHeader("Scores", "<b><i><color=Lime>Монеты:</color></i></b>", "<b><i><color=Lime>Монеты:</color></i></b>"),
  new DisplayValueHeader("Статус", "<b><i><color=Blue>Спавны:</color></b>", "<b><i><color=Blue>Спавны:</color></b>"),
];

LeaderBoard.PlayersWeightGetter.Set(function(player) {
  return player.Properties.Get("Scores").Value;
});





